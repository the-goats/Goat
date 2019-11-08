const {
  processBabel,
  processBabelFile,
} = require('./scripts/babel');
const schema = require('./scripts/schema');
const initConfiguration = require('./init/configuration.json');
const { normalize } = require('path');

module.exports = (Goat) => {
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
      events.watch({
        name: 'Babel',
        pattern: paths,
        events: /file:/,
        method: (data) => {
          processBabelFile({
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
