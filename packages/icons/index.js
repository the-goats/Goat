module.exports = (Goat) => new Goat({
  name: 'Icons',
  command: 'icons',
  description: 'Generate icon font files based on svg files',
  schema: require('./schema/schema.js'),
  async method(config) {
    const generateIconfont = require('./scripts/generateIconfont');
    generateIconfont(config);
  },
  watch(config) {
    const generateIconfont = require('./scripts/generateIconfont');
    generateIconfont(config);
    config.events.watch({
      name: 'Icons',
      pattern: `${config.configuration.locations.icons.src}/*.svg`,
      events: /file:/,
      method: () => {
        generateIconfont(config);
      },
    });
  },
});
