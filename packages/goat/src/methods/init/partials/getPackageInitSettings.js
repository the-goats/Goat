import Goat from '../../../bootstrap';
import loadModule from '../../modules/loadModule';

/**
 * Get init settings of a package
 * @param {array} packageConfig
 * @param {object} myGoat
 * @returns {object}
 */
function getPackageInitSettings(packageConfig, myGoat) {
  if (!Array.isArray(packageConfig)) {
    const config = packageConfig(myGoat);
    return {
      ...config.init,
      schema: config.schema,
    };
  }
  return packageConfig.map((item) => {
    const config = item(myGoat);
    return {
      ...config.init,
      schema: config.schema,
    };
  });
}

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
    };
  });
}

module.exports = getPackageInitialisation;
