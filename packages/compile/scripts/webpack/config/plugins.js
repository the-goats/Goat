/**
 * Collect Webpack plugins
 * @param {object} config
 * @returns {Array} an array of plugins
 */
function getPlugins(config) {
  const { ProgressPlugin, version } = require('webpack');
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
  const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
  const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
  const isWebpack4 = /^4\./.test(version);
  const isWebpack5 = /^5\./.test(version);

  const plugins = [
    new FriendlyErrorsWebpackPlugin(),
    new ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ];

  if (isWebpack4) {
    plugins.push(new FixStyleOnlyEntriesPlugin());
  }

  if (isWebpack5) {
    plugins.push(new RemoveEmptyScriptsPlugin());
  }

  if (config.configuration.bundler.js.esm) {
    const BabelEsmPlugin = require('babel-esm-plugin');
    plugins.push(new BabelEsmPlugin({
      filename: '[name].esm.js',
      chunkFilename: '[id].esm.js',
    }));
  }

  if (config.configuration.bundler.clean) {
    const { CleanWebpackPlugin } = require('clean-webpack-plugin');
    const { dist } = config.configuration.locations;
    plugins.push(new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [`${dist}/**/*`],
    }));
  }

  if (config.settings.analyse) {
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
    plugins.push(new BundleAnalyzerPlugin({
      excludeAssets: (assetName) => assetName.includes('.esm.js'),
    }));
  }

  return plugins;
}

module.exports = getPlugins;
