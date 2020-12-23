/**
 * Get the Webpack Production setup
 * @returns {Object}
 */
function getWebpackProductionSetup() {
  return {
    mode: 'production',
  };
}

/**
 * Get the Webpack Development setup
 * @returns {Object}
 */
function getWebpackDevelopmentSetup() {
  return {
    mode: 'development',
    devtool: 'source-map',
  };
}

/**
 * Get the Webpack setup
 * @param {Object} config
 * @returns {Object}
 */
function getWebpackSetup(config) {
  const { merge } = require('webpack-merge');
  const common = require('./config/webpack.common')(config);
  const webpack = require('webpack');
  const setup = config.settings.production ? getWebpackProductionSetup() : getWebpackDevelopmentSetup();
  return webpack(merge(common, setup));
}

module.exports = getWebpackSetup;
