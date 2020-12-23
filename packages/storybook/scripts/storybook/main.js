const { join } = require('path');
const goatGonfig = require('../config.js').config;

const stories = goatGonfig.configuration.locations.stories.map(({ directory, pattern }) => join(goatGonfig.path, directory, pattern));
module.exports = {
  stories,
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
  webpackFinal(config) {
    return config;
  },
};
