/**
 * Get Configured Javascript loader
 * @param config
 * @returns {Object} loader object
 */
function getJsLoader(config) {
  const { resolve } = require('path');
  let transformImports = {};
  try {
    // eslint-disable-next-line import/no-dynamic-require
    transformImports = require(`${config.path}/.goat/webpack`).transform;
    // eslint-disable-next-line no-empty
  } catch (e) {}
  return {
    test: /\.js$/,
    exclude: resolve(config.path, 'node_modules'),
    loader: require.resolve('babel-loader'),
    options: {
      presets: [[require.resolve('@babel/preset-env'), {
        targets: {
          browsers: ['last 2 versions', 'safari >= 7'],
        },
      }]],
      plugins: [
        [require.resolve('babel-plugin-transform-imports'), transformImports],
      ],
    },
  };
}

module.exports = getJsLoader;
