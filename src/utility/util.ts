import {
  JsonAstObject,
  JsonParseMode,
  parseJsonAst,
  strings
} from "@angular-devkit/core";
import {
  Rule,
  SchematicsException,
  Tree,
  UpdateRecorder
} from "@angular-devkit/schematics";
import {
  addDeclarationToModule,
  addEntryComponentToModule,
  addExportToModule,
  addImportToModule
} from "@schematics/angular/utility/ast-utils";
import { InsertChange } from "@schematics/angular/utility/change";
import { buildRelativePath } from "@schematics/angular/utility/find-module";
import * as ts from "typescript";

import { Schema } from "../mat-dialog/schema";

export function buildSelector(options: Schema, projectPrefix: string) {
  let selector = strings.dasherize(options.name);
  if (options.prefix) {
    selector = `${options.prefix}-${selector}`;
  } else if (options.prefix === undefined && projectPrefix) {
    selector = `${projectPrefix}-${selector}`;
  }

  return selector;
}

function readIntoSourceFile(tree: Tree, modulePath: string): ts.SourceFile {
  const text = tree.read(modulePath);
  if (text === null) {
    throw new SchematicsException(`File ${modulePath} does not exist.`);
  }
  const sourceText = text.toString("utf-8");

  return ts.createSourceFile(
    modulePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true
  );
}

function buildComponentPath(options: Schema, componentName: string): string {
  return `/${options.path}/${(options.flat
    ? ""
    : strings.dasherize(componentName)) +
    "/" +
    strings.dasherize(componentName) +
    ".component"}`;
}

function buildDeclarationRecorder(
  componentName: string,
  modulePath: string,
  options: Schema,
  tree: Tree
): UpdateRecorder {
  // Need to refresh the AST because we overwrote the file in the tree.
  const source = readIntoSourceFile(tree, modulePath);
  const componentPath = buildComponentPath(options, componentName);
  const relativePath = buildRelativePath(modulePath, componentPath);
  const classifiedName = strings.classify(`${componentName}Component`);
  const declarationChanges = addDeclarationToModule(
    source as any,
    modulePath,
    classifiedName,
    relativePath
  );

  const declarationRecorder = tree.beginUpdate(modulePath);
  for (const change of declarationChanges) {
    if (change instanceof InsertChange) {
      declarationRecorder.insertLeft(change.pos, change.toAdd);
    }
  }

  return declarationRecorder;
}

function buildExportRecorder(
  componentName: string,
  modulePath: string,
  options: Schema,
  tree: Tree
): UpdateRecorder {
  // Need to refresh the AST because we overwrote the file in the tree.
  const source = readIntoSourceFile(tree, modulePath);
  const relativePath = buildRelativePath(
    modulePath,
    buildComponentPath(options, componentName)
  );

  const exportRecorder = tree.beginUpdate(modulePath);
  const exportChanges = addExportToModule(
    source as any,
    modulePath,
    strings.classify(`${componentName}Component`),
    relativePath
  );

  for (const change of exportChanges) {
    if (change instanceof InsertChange) {
      exportRecorder.insertLeft(change.pos, change.toAdd);
    }
  }

  return exportRecorder;
}

function buildEntryComponentRecorder(
  componentName: string,
  modulePath: string,
  options: Schema,
  tree: Tree
): UpdateRecorder {
  // Need to refresh the AST because we overwrote the file in the tree.
  const source = readIntoSourceFile(tree, modulePath);
  const relativePath = buildRelativePath(
    modulePath,
    buildComponentPath(options, componentName)
  );
  const entryComponentRecorder = tree.beginUpdate(modulePath);
  const entryComponentChanges = addEntryComponentToModule(
    source as any,
    modulePath,
    strings.classify(`${componentName}Component`),
    relativePath
  );

  for (const change of entryComponentChanges) {
    if (change instanceof InsertChange) {
      entryComponentRecorder.insertLeft(change.pos, change.toAdd);
    }
  }

  return entryComponentRecorder;
}

function buildImportModuleRecorder(
  library: string,
  module: string,
  modulePath: string,
  tree: Tree
): UpdateRecorder {
  // Need to refresh the AST because we overwrote the file in the tree.
  const source = readIntoSourceFile(tree, modulePath);
  const importModuleRecorder = tree.beginUpdate(modulePath);
  const importModuleChanges = addImportToModule(
    source as any,
    modulePath,
    module,
    library
  );

  for (const change of importModuleChanges) {
    if (change instanceof InsertChange) {
      importModuleRecorder.insertLeft(change.pos, change.toAdd);
    }
  }

  return importModuleRecorder;
}

export function addDeclarationToNgModule(
  options: Schema,
  componentName: string,
  isDialog: boolean = false
): Rule {
  return (tree: Tree) => {
    if (options.skipImport || !options.module) {
      return tree;
    }

    const modulePath = options.module;

    tree.commitUpdate(
      buildDeclarationRecorder(componentName, modulePath, options, tree)
    );

    if (options.export) {
      tree.commitUpdate(
        buildExportRecorder(componentName, modulePath, options, tree)
      );
    }

    if (options.entryComponent || isDialog) {
      tree.commitUpdate(
        buildEntryComponentRecorder(componentName, modulePath, options, tree)
      );
    }

    return tree;
  };
}

export function addImportToNgModule(
  options: Schema,
  module: string,
  library: string
): Rule {
  return (tree: Tree) => {
    if (!options.module) {
      return tree;
    }

    const modulePath = options.module;

    tree.commitUpdate(
      buildImportModuleRecorder(library, module, modulePath, tree)
    );

    return tree;
  };
}

export function parseJsonAtPath(tree: Tree, path: string): JsonAstObject {
  const buffer = tree.read(path);

  if (buffer === null) {
    throw new SchematicsException("Could not read package.json.");
  }

  const content = buffer.toString();

  const json = parseJsonAst(content, JsonParseMode.Strict);
  if (json.kind != "object") {
    throw new SchematicsException(
      "Invalid package.json. Was expecting an object"
    );
  }

  return json;
}
