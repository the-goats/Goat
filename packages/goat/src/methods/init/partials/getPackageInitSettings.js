const Goat = require('../../../bootstrap/bootstrap');
const loadModule = require('../../modules/loadModule');

/**
 * Collect initialisation settings for packages
 * @param {object} answers
 */
function getPackageInitialisation(packages) {
  return packages.map((module) => {
    // eslint-disable-next-line
    const packageConfig = loadModule(module);
    return {
      module,
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
