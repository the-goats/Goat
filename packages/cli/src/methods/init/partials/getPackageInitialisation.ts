import { Goat } from '@the-goat/core';
import { JSONSchema6Object } from 'json-schema';
import loadModule from '../../modules/loadModule';

/**
 * Get init settings of a package
 */
function getPackageInitSettings(packageConfig: (Array<{}>|(() => ({ init: {}, schema: JSONSchema6Object })))) {
  if (!Array.isArray(packageConfig)) {
    const config = packageConfig();
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
 */
export default function getPackageInitialisation(packages: {}[]) {
  return packages.map((module) => {
    const packageConfig = loadModule(module);
    return {
      module,
      package: packageConfig,
      init: getPackageInitSettings(packageConfig, Goat),
    };
  });
}
