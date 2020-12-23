module.exports = (Goat) => new Goat({
  name: 'Compile',
  command: 'compile',
  description: 'Webpack based compiler for Javascript and scss',
  schema: require('./scripts/schema'),
  options: {
    '-p, --production': 'Production',
  },
  async method(config) {
    const { runAll } = require('./scripts/webpack/runner');
    runAll({
      ...config,
      settings: {
        production: config.options.production,
      },
    });
  },
  watch(config) {
    const { runWatch } = require('./scripts/webpack/runner');
    runWatch(config);
  },
  init: {
    configuration: require('./init/configuration.json'),
  },
});
