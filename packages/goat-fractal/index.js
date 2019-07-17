const scriptFractal = require('./scripts/fractal');
const schema = require('./scripts/schema');
const initConfiguration = require('./init/configuration.json')

module.exports = {
  actions(goat, Goat) {
    const fractal = new Goat({
      name: 'Styleguide',
      schema,
      method: (config) => {
        return new Promise((resolve, reject) => {
          resolve(scriptFractal(config));
        });
      }
    });

    goat
      .command('styleguide')
      .description('Generate a custom Modernizr file')
      .action(() => fractal.action());

    return goat;
  },
  init: {
    configuration: initConfiguration,
  },
};
