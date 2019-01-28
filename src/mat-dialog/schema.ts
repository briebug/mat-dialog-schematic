import { Path } from '@angular-devkit/core';

export interface Schema {
  entryComponent: boolean;
  export: boolean;
  flat: boolean;
  inlineStyle: boolean;
  inlineTemplate: boolean;
  lintFix: boolean;
  module?: Path;
  name: string;
  name2: string;
  path: string;
  prefix: string;
  project: string;
  selector: string;
  skipImport: boolean;
  spec: boolean;
}
