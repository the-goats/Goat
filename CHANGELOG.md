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
