

module.exports = (Goat) => new Goat({
  name: 'Storybook',
  command: 'story',
  description: 'Manage a design system using storybook',
  schema: require('./schema/schema'),
  options: [
    {
      label: 'Build',
      flags: '-b, --build',
      allowOnOnce: true,
      allowOnWatch: true,
    },
    {
      label: 'Include storybook when watching',
      flags: '--story',
      allowOnOnce: false,
      allowOnWatch: true,
    },
  ],
  async method(config) {
    if (config.options.build) {
      require('./scripts/storybook/buildStory')(config);
      return;
    }
    require('./scripts/storybook/runStory')(config);
  },
  watch(config) {
    const notifier = require('@the-goat/notifier');
    if (!config.options.story) {
      notifier.info('Skipping Storybook while watching, to include storybook run watch with the --story flag');
      return;
    }
    require('./scripts/storybook/runStory')(config);
  },
  init: {
    files: () => require('./init/files.js'),
  },
});
