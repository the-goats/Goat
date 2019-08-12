const {
  processBabel,
  processBabelFile,
} = require('./scripts/babel');
const {
  processEslint,
  processEslintFile,
} = require('./scripts/eslint');
const runEslint = require('./scripts/eslint');
const schema = require('./scripts/schema');
const initConfiguration = require('./init/configuration.json');
const {
  normalize
} = require('path');

module.exports = [
  (Goat) => {
    return new Goat({
      name: 'Babel',
      command: 'babel',
      description: 'Compile .es6.js files using babel',
      schema,
      method: (config) => {
        return new Promise((resolve, reject) => {
          const {
            configuration
          } = config;
          const sources = typeof configuration.locations.javascript.src === 'Array' ? configuration.locations.javascript.src : [configuration.locations.javascript.src];
          processBabel({
            ...config,
            sources,
          })
          resolve(true);
        });
      },
      watch: (config) => {
        const { configuration, watch, Notifier, path } = config;
        const sources = typeof configuration.locations.javascript.src === 'Array' ? configuration.locations.javascript.src : [configuration.locations.javascript.src];
        processBabel({
          ...config,
          sources,
        })
        watch(sources.map(item => normalize(`${path}/${item}/**/*.es6.js`)))
        .on('change', (file) => {
          Notifier.log(Notifier.style.bold(`\nFile ${file} has been changed`));
          processBabelFile({
            ...config,
            file,
          });
        });
      },
      init: {
        configuration: initConfiguration,
      }
    });
  },
  (Goat) => {
    return new Goat({
      name: 'Eslint',
      command: 'eslint',
      description: 'Run eslint',
      schema,
      method: (config) => {
        return new Promise((resolve, reject) => {
          const {
            configuration
          } = config;
          const sources = typeof configuration.locations.javascript.src === 'Array' ? configuration.locations.javascript.src : [configuration.locations.javascript.src];
          processEslint({
            ...config,
            sources,
          });
          resolve(true);
        });
      },
      watch: (config) => {
        const { configuration, watch, Notifier, path } = config;
        const sources = typeof configuration.locations.javascript.src === 'Array' ? configuration.locations.javascript.src : [configuration.locations.javascript.src];
        processEslint({
          ...config,
          sources,
        })
        watch(sources.map(item => normalize(`${path}/${item}/**/*.js`)))
        .on('change', (file) => {
          Notifier.log(Notifier.style.bold(`\nFile ${file} has been changed`));
          processEslintFile({
            ...config,
            file,
          });
        });
      },
      init: {
        configuration: initConfiguration,
      }
    });
  }
];
