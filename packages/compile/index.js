module.exports = (Goat) => new Goat({
  name: 'Compile',
  command: 'compile',
  description: 'Webpack based compiler for Javascript and scss',
  schema: require('./schema/schema.js'),
  options: [
    {
      label: 'Compile for production',
      flags: '-p, --production',
      allowOnOnce: true,
      allowOnWatch: true,
    },
    {
      label: 'Analyse javascript dependency sizes',
      flags: '-a, --analyse',
      allowOnOnce: true,
      allowOnWatch: false,
    },
  ],
  async method(config) {
    const { runAll } = require('./scripts/webpack/runner');
    return runAll({
      ...config,
      settings: {
        production: config.options.production,
        analyse: config.options.analyse,
      },
    });
  },
  watch(config) {
    const { runWatch } = require('./scripts/webpack/runner');
    runWatch({
      ...config,
      settings: {
        production: config.options.production,
      },
    });
  },
  init: {
    files: () => require('./init/files.js'),
  },
});
