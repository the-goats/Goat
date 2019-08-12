const buildModernizr = require('./scripts/modernizr');
const schema = require('./scripts/schema');
const initConfiguration = require('./init/configuration.json')

module.exports = (Goat) => {
  return new Goat({
    name: 'Modernizr',
    command: 'modernizr',
    description: 'Generate a custom Modernizr file',
    schema,
    method: (config) => {
      return new Promise((resolve, reject) => {
        resolve(buildModernizr(config));
      });
    },
    init: {
      configuration: initConfiguration,
    }
  });
};
