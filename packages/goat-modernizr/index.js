const buildModernizr = require('./scripts/modernizr');
const schema = require('./scripts/schema');
const initConfiguration = require('./init/configuration.json')

module.exports = {
  actions(goat, Goat) {
    const modernizr = new Goat(
      'Modernizr',
      schema,
      (config) => {
        return new Promise((resolve, reject) => {
          resolve(buildModernizr(config));
        });
      }
    );

    goat
      .command('modernizr')
      .description('Generate a custom Modernizr file')
      .action(() => modernizr.action());

    return goat;
  },
  init: {
    configuration: initConfiguration,
  },
};
