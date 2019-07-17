const runBabel = require('./scripts/babel');
const runEslint = require('./scripts/eslint');
const schema = require('./scripts/schema');
const initConfiguration = require('./init/configuration.json')

module.exports = {
  actions(goat, Goat) {
    const modernizr = new Goat(
      'Modernizr',
      schema,
      (config) => {
        return new Promise((resolve, reject) => {
          resolve(buildModernizr(config));
        });
      }
    );
  
    const babel = new Goat(
      'Babel',
      schema,
      (config) => {
        return new Promise((resolve, reject) => {
          resolve(runBabel(config));
        });
      }
    );
  
    const eslint = new Goat(
      'Eslint',
      schema,
      (config) => {
        return new Promise((resolve, reject) => {
          resolve(runEslint(config));
        })
      }
    );
  
    goat
      .command('modernizr')
      .description('Generate a custom Modernizr file')
      .action(() => modernizr.action());
  
    goat
      .command('babel')
      .description('Compile .es6.js files using babel')
      .option('-w, --watch', 'Keep watching the .es6.js files')
      .action(({watch}) => babel.action({ watch }));
  
    goat
      .command('eslint')
      .description('Run eslint')
      .option('-w, --watch', 'Keep watching the js files')
      .action(({watch}) => eslint.action({ watch }));
    return goat;
  },
  init: {
    configuration: initConfiguration,
  },
};
