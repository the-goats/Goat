/**
 * Get webpack config
 * @param {Object} config
 * @returns {Object}
 */
module.exports = function getCommon(config) {
  const { path, configuration, entryFiles } = config;
  const loaders = require('./loaders')(config);
  const plugins = require('./plugins')(config);
  const { normalize } = require('path');
  const { get } = require('lodash');
  return {
    context: path,
    entry: entryFiles,
    output: {
      filename: get(configuration, 'bundler.js.output.filename') || '[name].bundle.js',
      path: normalize(path),
      publicPath: get(configuration, 'bundler.js.output.publicPath'),
    },
    module: {
      rules: Object.values(loaders),
    },
    plugins: Object.values(plugins),
    resolve: {
      extensions: ['.js', '.json', '.twig'],
    },
  };
};
