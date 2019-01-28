# Mat Dialog Angular Schematic

[![npm (scoped)](https://img.shields.io/npm/v/@briebug/mat-dialog-schematic.svg)](https://www.npmjs.com/package/@briebug/mat-dialog-schematic)

Generate [Angular Material Dialogs](https://material.angular.io/components/dialog/overview) in an Angular CLI project

This schematic will:

- install @angular/material if not already installed
- generate a component from which the dialog is launched, as well as the dialog component itself
- handle the declaration, export, and entryComponent requirements for the 2 components
- import the MatButton, MatDialog, and BrowserAnimations modules if not already installed

## Usage 🚀

Install globally

```shell
npm install -g @briebug/mat-dialog-schematic
```

Then in an Angular CLI project run

```shell
ng g @briebug/mat-dialog-schematic
```

## Issues

Issues with this schematic can be filed [here](https://github.com/briebug/mat-dialog-schematic/issues/new/choose).

## Development 🛠

### Getting started

⚙ [Yarn](https://yarnpkg.com/en/docs/install#mac-stable) is required for the scripts. Make sure it's installed on your machine.

⬇ **Install** the dependencies for the schematic and the sandbox application

```bash
yarn && cd sandbox && yarn && cd ..
```

🖇 **Link** the schematic in the sandbox to run locally

```bash
yarn link:schematic
```

🏃 **Run** the schematic

```bash
yarn build:clean:launch
```

To execute an example schematic, make sure you've ran the **Install** and **Link** steps above. Then run the following and inspect the changed files.

```bash
git checkout component-license && yarn build:clean:launch
```

## E2E testing

Execute the schematic against the sandbox. Then run linting, unit & e2e tests and a prod build in the sandbox.

```bash
yarn test
```

## Unit Testing

Run the unit tests using Jasmine as a runner and test framework.

```bash
yarn test:unit
```

## Reset the sandbox

Running the schematic locally makes file system changes. The sandbox is version controlled so that viewing a diff of the changes is trivial. After the schematic has run locally, reset the sandbox with the following.

```bash
yarn clean
```

_Note: if you're using the `schematics` CLI mentioned below, you can execute the schematic in a dry run mode._

## Change the Schematic name

1. do a global search and replace for `schematic-starter` and `schematicStarter` with the new name.
2. change the folder name from `./src/schematic-starter/...` to `./src/NEW_NAME/...`
3. run `yarn link:schematic` to set up local package linking for the sandbox

## Optional - Testing with the Schematics CLI

To test locally, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI but also has a debug mode.

Check the documentation with

```bash
schematics --help
```

## Publishing

To publish, simply do:

```bash
npm run build
npm publish
```
