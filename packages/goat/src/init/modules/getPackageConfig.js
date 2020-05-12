const { merge } = require('lodash');

/**
 * Get config of packages
 * @param {array} packageConfig
 * @param {object} Goat
 * @returns {object}
 */
function getPackageConfig(packageInit) {
  if (!Array.isArray(packageInit)) {
    return packageInit.configuration;
  }
  // eslint-disable-next-line
  return packageConfig.reduce((result = {}, currentValue) => {
    return merge(result, currentValue.configuration);
  });
}

module.exports = getPackageConfig;
