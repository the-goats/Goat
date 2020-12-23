module.exports = function getJsLoader(config) {
  const { resolve } = require('path');
  return {
    test: /\.js$/,
    exclude: resolve(config.path, 'node_modules'),
    loader: require.resolve('babel-loader'),
  };
};
