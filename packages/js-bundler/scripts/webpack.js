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
    module: {
      rules: [ 
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('cache-loader'),
            },
            {
              loader: require.resolve('babel-loader'),
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
            }
          ]
        },
        ts ? {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('cache-loader'),
            },
            {
              loader: require.resolve('ts-loader'),
              options: {
                configFile: resolve(__dirname, './tsconfig.json'),
              },
            }
          ],
        } : {},
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
  });
}

module.exports = getWebpackSetup;