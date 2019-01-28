import { strings } from '@angular-devkit/core';
import {
  Rule,
  apply,
  branchAndMerge,
  chain,
  externalSchematic,
  filter,
  mergeWith,
  move,
  noop,
  template,
  url
} from '@angular-devkit/schematics';
import { Tree } from '@angular-devkit/schematics/src/tree/interface';
import { findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { applyLintFix } from '@schematics/angular/utility/lint-fix';
import { parseName } from '@schematics/angular/utility/parse-name';
import {
  buildDefaultPath,
  getProject
} from '@schematics/angular/utility/project';

import { NodeDependencyType, pkgJson } from '../utility/dependencies';
import { findPropertyInAstObject } from '../utility/json-utils';
import {
  addDeclarationToNgModule,
  addImportToNgModule,
  buildSelector,
  parseJsonAtPath
} from '../utility/util';
import { Schema } from './schema';

export default function(options: Schema): Rule {
  return (tree: Tree) => {
    const project = getProject(tree, options.project);

    if (options.path === undefined) {
      options.path = buildDefaultPath(project);
    }

    options.module = findModuleFromOptions(tree, options);

    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.name2 = `${parsedPath.name}Dialog`;
    options.path = parsedPath.path;
    options.selector =
      options.selector || buildSelector(options, project.prefix);

    const templateSource = apply(url('./files'), [
      options.spec ? noop() : filter(path => !path.endsWith('.spec.ts')),
      options.inlineStyle
        ? filter(path => !path.endsWith('.__styleext__'))
        : noop(),
      options.inlineTemplate ? filter(path => !path.endsWith('.html')) : noop(),
      template({
        ...strings,
        'if-flat': (s: string) => (options.flat ? '' : s),
        ...options
      }),
      move(parsedPath.path)
    ]);

    const packageJsonAst = parseJsonAtPath(tree, pkgJson.Path);
    const depsNode = findPropertyInAstObject(
      packageJsonAst,
      NodeDependencyType.Default
    );
    let depNode;

    if (depsNode && depsNode.kind === 'object') {
      depNode = findPropertyInAstObject(depsNode, '@angular/material');
    }

    return chain([
      branchAndMerge(
        chain([
          !depNode
            ? externalSchematic('@angular/material', 'ng-add', {})
            : noop(),
          addDeclarationToNgModule(options, options.name),
          addDeclarationToNgModule(options, options.name2, true),
          addImportToNgModule(options, 'MatButtonModule', '@angular/material'),
          addImportToNgModule(options, 'MatDialogModule', '@angular/material'),
          addImportToNgModule(
            options,
            'BrowserAnimationsModule',
            '@angular/platform-browser/animations'
          ),
          mergeWith(templateSource)
        ])
      ),
      options.lintFix ? applyLintFix(options.path) : noop()
    ]);
  };
}
