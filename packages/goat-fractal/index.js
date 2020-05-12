const scriptFractal = require('./src/script');
const schema = require('./src/schema');
const initConfiguration = require('./init/configuration.json');

module.exports = function styleguide(Goat) {
  return new Goat({
    name: 'Styleguide',
    command: 'styleguide',
    description: 'Compile Styleguide',
    schema,
    method: (config) => {
      scriptFractal(config);
    },
    watch: (config) => {
      scriptFractal(config);
    },
    init: {
      configuration: initConfiguration,
      files: () => require('./init/files.js'),
    },
  });
};
