module.exports = function getPlugins(config) {
  const { ProgressPlugin } = require('webpack');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
  const { dist } = config.configuration.locations;
  return {
    ProgressPlugin: new ProgressPlugin(),
    FixStyleOnlyEntriesPlugin: new FixStyleOnlyEntriesPlugin({
      silent: true,
    }),
    MiniCssExtractPlugin: new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    CleanWebpackPlugin: new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [`${dist}/**/*`],
    }),
  };
};
