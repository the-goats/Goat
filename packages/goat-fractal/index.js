module.exports = function styleguide(Goat) {
  return new Goat({
    name: 'Styleguide',
    command: 'styleguide',
    description: 'Compile Styleguide',
    schema: require('./src/schema'),
    method: (config) => {
      const scriptFractal = require('./src/script');
      scriptFractal(config);
    },
    watch: (config) => {
      const scriptFractal = require('./src/script');
      scriptFractal(config);
    },
    init: {
      configuration: require('./init/configuration.json'),
      files: () => require('./init/files.js'),
    },
  });
};
