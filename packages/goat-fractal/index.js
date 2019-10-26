const scriptFractal = require('./scripts/script');
const schema = require('./scripts/schema');
const initConfiguration = require('./init/configuration.json')

module.exports = (Goat) => {
  return new Goat({
    name: 'Styleguide',
    command: 'styleguide',
    description: 'Compile Styleguide',
    schema,
    method: (config) => {
      scriptFractal(config)
    },
    init: {
      configuration: initConfiguration,
    }
  });
};
