/**
 * Collect Webpack plugins
 * @param {object} config
 * @returns {Array} an array of plugins
 */
function getPlugins(config) {
  const { ProgressPlugin } = require('webpack');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
  const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

  const plugins = [
    new FriendlyErrorsWebpackPlugin(),
    new ProgressPlugin(),
    new FixStyleOnlyEntriesPlugin({
      silent: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ];

  if (config.configuration.bundler.clean) {
    const { dist } = config.configuration.locations;
    plugins.push(new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [`${dist}/**/*`],
    }));
  }

  return plugins;
}

module.exports = getPlugins;
