/**
 * Collect Loaders
 * @param {Object} config
 * @returns {Array} an array of loaders
 */
function getLoaders(config) {
  const loaders = [];
  if (config.configuration.handlers.javascript) {
    loaders.push(require('./loaders/jsLoader')(config));
  }
  if (config.configuration.handlers.styles) {
    loaders.push(require('./loaders/styleLoader')(config));
  }
  if (config.configuration.handlers.assets) {
    loaders.push(require('./loaders/assetLoader')(config));
  }

  return loaders;
}

module.exports = getLoaders;
