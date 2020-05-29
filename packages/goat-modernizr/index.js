module.exports = (Goat) => {
  return new Goat({
    name: 'Modernizr',
    command: 'modernizr',
    description: 'Generate a custom Modernizr file',
    schema: require('./scripts/schema'),
    method: (config) => {
      const buildModernizr = require('./scripts/modernizr');
      return new Promise((resolve) => {
        resolve(buildModernizr(config));
      });
    },
    init: {
      configuration: require('./init/configuration.json'),
    }
  });
};
