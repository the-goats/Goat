const {
  processBabel,
  processBabelFile,
} = require('./scripts/babel');
const {
  processEslint,
  processEslintFile,
} = require('./scripts/eslint');
const schema = require('./scripts/schema');
const initConfiguration = require('./init/configuration.json');
const { normalize } = require('path');

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
        const { configuration, events } = config;
        const sources = typeof configuration.locations.javascript.src === 'Array' ? configuration.locations.javascript.src : [configuration.locations.javascript.src];
        processBabel({
          ...config,
          sources,
        })
        const paths = sources.map(item => normalize(`${item}/**/*.es6.js`));
        events.watch((data) => {
          processBabelFile({
            ...config,
            file: data.path,
          });
        }, {
          name: 'Babel',
          pattern: paths,
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
        return new Promise((resolve) => {
          const { configuration } = config;
          const sources = typeof configuration.locations.javascript.src === 'Array' ? configuration.locations.javascript.src : [configuration.locations.javascript.src];
          processEslint({
            ...config,
            sources,
          });
          resolve(true);
        });
      },
      watch: (config) => {
        const { configuration, events } = config;
        const sources = typeof configuration.locations.javascript.src === 'Array' ? configuration.locations.javascript.src : [configuration.locations.javascript.src];
        processEslint({
          ...config,
          sources,
        })
        const paths = sources.map(item => normalize(`${item}/**/*.es6.js`));
        events.watch((data) => {
          processEslintFile({
            ...config,
            file: data.path,
          });
        }, {
          name: 'Eslint',
          pattern: paths,
        });
      },
      init: {
        configuration: initConfiguration,
      }
    });
  }
];
