module.exports = (Goat) => new Goat({
  name: 'Storybook',
  command: 'story',
  description: 'Manage a design system using storybook',
  schema: require('./scripts/schema'),
  async method(config) {
    require('./scripts/storybook/runStory')(config);
  },
  watch(config) {
  },
  init: {
    configuration: require('./init/configuration.json'),
  },
});
