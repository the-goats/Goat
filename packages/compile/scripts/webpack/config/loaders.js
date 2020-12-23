module.exports = function getLoaders(config) {
  const loaders = {};
  if (config.configuration.handlers.javascript) {
    loaders.JSLoader = require('./loaders/jsLoader')(config);
  }
  if (config.configuration.handlers.styles) {
    loaders.CSSLoader = require('./loaders/styleLoader')(config);
  }
  if (config.configuration.handlers.assets) {
    loaders.AssetLoader = require('./loaders/assetLoader')(config);
  }

  return loaders;
};
