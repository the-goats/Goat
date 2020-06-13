/**
 * Get the Webpack setup
 * @param {Object} { path, configuration, entryFiles, ts }
 * @returns {Object}
 */
function getWebpackSetup({ path, configuration, entryFiles, ts }) {
  const { normalize, resolve } = require('path');
  const webpack = require('webpack');
  return webpack({
    mode: 'development',
    context: path,
    entry: entryFiles,
    output: {
      filename: '[name].bundle.js',
      path: normalize(path),
    },
    resolveLoader: {
      modules: [resolve(__dirname, '../node_modules')],
      extensions: ['.js', '.json'],
      mainFields: ['loader', 'main']
    },
    module: {
      rules: [ 
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: resolve(__dirname, '../node_modules/babel-loader/lib/index.js'),
          query: {
            plugins: [
              require('babel-plugin-lodash'),
              [
                require('babel-plugin-root-import'),
                {
                  rootPathPrefix: '@/',
                },
              ],
            ],
            presets: [
              [
                require('babel-preset-airbnb'),
                {
                  targets: configuration.browserSupport,
                },
              ],
            ],
          },
        },
        ts ? {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: resolve(__dirname, '../node_modules/ts-loader/index.js'),
          options: {
            configFile: resolve(__dirname, './tsconfig.json'),
          },
        } : {},
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
  });
}

module.exports = getWebpackSetup;