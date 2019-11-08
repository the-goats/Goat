const {
  processEslint,
  processEslintFile,
} = require('./scripts/eslint');
const schema = require('./scripts/schema');
const initConfiguration = require('./init/configuration.json');
const { normalize } = require('path');

module.exports = (Goat) => {
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
      events.watch({
        name: 'Eslint',
        pattern: paths,
        events: /file:/,
        method: (data) => {
          processEslintFile({
            ...config,
            file: data.path,
          });
        },
      });
    },
    init: {
      configuration: initConfiguration,
    }
  });
};
