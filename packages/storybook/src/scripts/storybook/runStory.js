/**
 * Execute webpack config
 * @param {Object} config
 */
function runStory(config) {
  const goatGonfig = require('../config.js');
  goatGonfig.config = config;
  const server = require('@storybook/core/server');
  function interopRequireDefault(obj) {
    // eslint-disable-next-line no-underscore-dangle
    return obj && obj.__esModule ? obj : { default: obj };
  }

  const options = interopRequireDefault(require('@storybook/html/dist/server/options'));
  server.buildDevStandalone({
    ...options.default,
    configDir: __dirname,
    port: 6006,
    ci: true,
  });
}

module.exports = runStory;
