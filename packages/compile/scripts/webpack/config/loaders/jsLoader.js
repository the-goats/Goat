/**
 * Get Configured Javascript loader
 * @param config
 * @returns {Object} loader object
 */
function getJsLoader(config) {
  const { resolve } = require('path');
  return {
    test: /\.js$/,
    exclude: resolve(config.path, 'node_modules'),
    loader: require.resolve('babel-loader'),
  };
}

module.exports = getJsLoader;
