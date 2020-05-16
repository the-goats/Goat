![npm version](https://badgen.net/npm/v/@geit/goat?icon=npm)
![npm downloads](https://badgen.net/npm/dt/@geit/goat?icon=npm)
![npm weekly downloads](https://badgen.net/npm/dw/@geit/goat?icon=npm)
![npm licence](https://badgen.net/npm/license/@geit/goat)
![last commit](https://badgen.net//github/last-commit/stefspakman/Goat?icon=github)
![github issues](https://badgen.net//github/issues/stefspakman/Goat?icon=github)
![github stars](https://badgen.net//github/stars/stefspakman/Goat?icon=github)

# Goat
Goat is a simple to use taskrunner for frontend development. 

## Why Goat
Instead of defining and maintaining separate setups for compiling, linting and building your code, goat aims to have a predefined, flexible setup that's easy to initialize and to keep up to date. 

## Build-in modules
Goat contains modules which define tasks. Per project you can choose which tasks you want to configure. Each module defines tasks which can be run manually or, if supported, use the integrated watch flag to watch relevant files and run the tasks when a change is detected. 

Also goat includes an integrated watch command which combines all watch enabled tasks in one command.

Currently Goat includes several tasks:
#### Styles
A complete workflow to compile your SASS/SCSS. It Integrates an autoprefixer, compass support and a minifier.
#### Babel
Automatically compile your ES6 to ES5 compatible code. Files suffixed with `.es6.js` will be detected and converted to work according to the defined browser support settings.
#### Eslint
Lint files suffixed with `.es6.js` according to the AirBnB standard
#### Modernizr
Generate custom modernizr.js files by analizing your css and js files.
#### Fractal
Initialize a styleguide using Fractal.

## Usage
#### Initialize
To start using goat in your project, just run `goat init`.
#### Check available Tasks
Run `goat` to display the help which lists all the available tasks.
#### Watch project
Run all watch enabled tasks simultaneously typing `goat watch` in your terminal.

## Extending Goat
It is possible to write your own modules which can be installed seperatly from Goat. These modules have to be globally installed node modules and have to be added to the settings file located in `~/.goat`. Each module Intergrates via the Goat class which offers various build-in methods such as notifications and the Goat watcher.

An example will be provided in an upcomming version.

## License

All code released under [MIT]

[mit]: https://github.com/stefspakman/Goat/blob/master/LICENSE