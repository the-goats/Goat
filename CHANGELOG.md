## 1.9.
- Fix: Updated dependencies

## 1.9.0
### Compile
- Feat: Added BabelEsmPlugin to generate modern javascript files - this feature needs to be enabled manually due to possible bugs regarding css, set bundler.js.esm to true in goat.config.js
- Feat: Added babel-plugin-transform-imports to improve treeshaking. You can configure this per project via webpack.js inside the .goat folder. The lodash definition is pre loaded.
- Feat: Allow modifing the webpack setup per project from .goat/webpack.js
- Fix: fixes filenames of compile module, remove .es6 from compiled file
###Icons
- Module: Goat Icons - Auto generate icon font / svg sprites from svg files 

## 1.8.4
- Feat: update project config when keys are missing
- Feat: Build and update project config using json schemas instead of configuration sample files

## 1.8.3
- Fix: various bugfixes for Compile
- Fix: various bugfixes for Storybook
- Fix: allow flags on watch tasks

## 1.8.2
- Feat: Compile task added based on webpack
- Feat: Storybook task added
- Feat: Allow for usage of flags in modules

## 1.7.2
- Fix: Polyfill JS classes using js bundler

## 1.7.1
- Fix: Updated dependencies
- Improvement: Added -v flag for version (in addition to -V and --version)

## 1.7.0
- Fix: bundler not including dependencies in bundle
- Improvement: minify the bundled content
- Change: JS bundler is now a default module. babel, eslint and modernizr no longer are
- Improvement: various code style improvements

## 1.6.4
- Added cache-loader to JS-bundler to improve speed (mainly for typescript)

## 1.6.3
- Bugfix JS-bundler

## 1.6.2
- Bugfix: JS-bundler

## 1.6.1
- Bugfix: JS-bundler

## 1.6.0
- Added new module: JS-bundler

## 1.5.1
- Feature: added `project ls` command
- Feature: added a debug flag
- Fix: show descriptions of build-in modules

## 1.5.0
- Feature: Added module system, 
- Performance: reduced load times by optimizing module loading
- Refactor: functions key in .goat/config is deprecated
- Fix: Version management will no longer downgrade the project
