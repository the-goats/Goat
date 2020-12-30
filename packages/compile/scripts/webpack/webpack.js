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

function modifyWebpackConfig(config, instance) {
  try {
    // eslint-disable-next-line import/no-dynamic-require
    const modifyWebpack = require(`${config.path}/.goat/webpack`).webpack(instance);
    if (!modifyWebpack || (Object.keys(modifyWebpack).length === 0 && modifyWebpack.constructor === Object)) {
      return instance;
    }
    return modifyWebpack;
  } catch (e) {
    return instance;
  }
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
  const instance = modifyWebpackConfig(config, merge(common, setup));
  return webpack(instance);
}

module.exports = getWebpackSetup;
