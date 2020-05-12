const { merge } = require('lodash');
const Goat = require('../../bootstrap/bootstrap');

/**
 * Collect initialisation settings for packages
 * @param {object} answers
 */
function getPackageInitialisation(packages) {
  return packages.map((plugin) => {
    // eslint-disable-next-line
    const packageConfig = require(plugin);
    return {
      plugin,
      package: packageConfig,
      init: getPackageInitSettings(packageConfig, Goat),
    }
  });
}

/**
 * Get init settings of a package
 * @param {array} packageConfig
 * @param {object} Goat
 * @returns {object}
 */
function getPackageInitSettings(packageConfig, Goat) {
  if (!Array.isArray(packageConfig)) {
    return packageConfig(Goat).init;
  }
  return packageConfig.map((item) => item(Goat).init);
}

module.exports = getPackageInitialisation;
