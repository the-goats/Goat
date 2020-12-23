module.exports = function getStyleLoader(config) {
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const globImporter = require('node-sass-glob-importer');
  const { resolve } = require('path');

  const styleResources = config.configuration.styles.resources || [];
  const resources = styleResources.map((resource) => resolve(config.path, resource));
  return {
    test: /\.s[ac]ss$/i,
    exclude: resolve(config.path, 'node_modules'),
    include: [
      resolve(config.path, 'components'),
    ],
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: require.resolve('css-loader'),
        options: {
          sourceMap: true,
          url: true,
        },
      },
      {
        loader: require.resolve('resolve-url-loader'),
      },
      {
        loader: require.resolve('sass-loader'),
        options: {
          sourceMap: true,
          sassOptions: {
            importer: globImporter(),
            outputStyle: 'compressed',
          },
        },
      },
      {
        loader: require.resolve('sass-resources-loader'),
        options: {
          resources,
        },
      },
    ],
  };
};
