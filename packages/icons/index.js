module.exports = (Goat) => new Goat({
  name: 'Icons',
  command: 'icons',
  description: 'Generate icon font files based on svg files',
  schema: require('./schema/schema.js'),
  async method(config) {
    const { runAll } = require('./scripts/generateIconfont');
    runAll(config);
  },
  watch(config) {
    const { runAll, runSingle } = require('./scripts/generateIconfont');
    runAll(config);
    config.events.watch({
      name: 'Icons',
      pattern: `${config.configuration.locations.icons.src}/**/*.svg`,
      events: /file:/,
      method: (item) => {
        runSingle(config, item.path);
      },
    });
  },
});
