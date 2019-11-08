const { merge } = require('lodash');

/**
 * Get config of packages
 * @param {array} packageConfig
 * @param {object} Goat
 * @returns {object}
 */
function getPackageConfig(packageConfig, Goat) {
  if (!Array.isArray(packageConfig)) {
    return packageConfig(Goat).init.configuration;
  }
  // eslint-disable-next-line
  return packageConfig.reduce((result = {}, currentValue) => {
    return merge(result, currentValue(Goat).init.configuration);
  });
}

module.exports = getPackageConfig;
