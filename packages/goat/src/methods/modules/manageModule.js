const importGlobal = require('import-global');
const getGlobalConfig = require('../settings/getGlobalConfig');
const updateGlobalSettings = require('../settings/updateGlobalSettings');
const confirm = require('../helpers/confirm');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

/**
 * Action to add a module to Goat
 * @param {String} module
 */
async function actionAddModule(module) {
  const config = await getGlobalConfig();
  if (checkInstalledModules(config, module)) {
    console.error(`${module} is already installed`);
    process.exit();
  }
  const modulePacakge = await getModulePackage(module);
  if (!modulePacakge.goat) {
    console.error(`${module} doesn\'t seem to be a Goat Module`);
    const confirmUninstallModule = await confirm({
      message: 'Do you want to uninstall this module?',
      default: false,
     });
    if (confirmUninstallModule) {
      await uninstallModule(module);
    }
    process.exit();
  }
  addToSettings(config, modulePacakge);
  console.log(`${module} is succesfully installed`);
}

/**
 * Action to remove a module from Goat
 * @param {String} module
 */
async function actionRemoveModule(module) {
  const config = await getGlobalConfig();
  if (!checkInstalledModules(config, module)) {
    console.error(`${module} is not installed`);
    process.exit();
  }
  const confirmUninstallModule = await confirm({
    message: 'Do you want to uninstall this module completely?',
    default: false,
   });
  if (confirmUninstallModule) {
    await uninstallModule(module);
  }
  removeFromSettings(config, module);
  console.log(`${module} is succesfully removed`);
}

/**
 * Check if the module is added to the global settings
 * @param {Object} config
 * @param {String} module
 * @returns {Boolean}
 */
function checkInstalledModules(config, module) {
  return Boolean(config.modules.filter(item => item.package === module).length);
}

/**
 * Get the package.json file of the requested module. If the module does not exist, install it
 * @param {String} module
 * @returns {Object}
 */
async function getModulePackage(module) {
  try {
    return importGlobal(`${module}/package.json`);;
  } catch ({ code }) {
    if (code !== 'MODULE_NOT_FOUND') {
      throw new Error(`Error: ${code}`);
    }
    console.log(`${module} is not yet installed, installing it now`)
    await installModule(module);
    return importGlobal(`${module}/package.json`);
  }
}

/**
 * Install module using NPM
 * @param {String} module
 * @returns {Promise}
 */
function installModule(module) {
  try {
    return exec(`npm install ${module} -g`);
  } catch(error) {
    throw error;
  }
}

/**
 * Uninstall module from the system
 * @param {String} module
 * @returns {Promise}
 */
function uninstallModule(module) {
  try {
    return exec(`npm uninstall ${module} -g`);
  } catch(error) {
    throw error;
  }
}

/**
 * Add module details to the global settings
 * @param {Object} config
 * @param {Object} moduleConfig
 * @param {boolean} [isDefault=false]
 * @returns {Promise}
 */
function addToSettings(config, moduleConfig, isDefault = false) {
  config.modules.push({
    name: moduleConfig.goat.name,
    package: moduleConfig.name,
    description: moduleConfig.goat.description || moduleConfig.description,
    default: isDefault,
  });
  return updateGlobalSettings(config);
}

/**
 * Remove module details from the global settings
 * @param {Object} config
 * @param {String} module
 * @returns {Promise}
 */
function removeFromSettings(config, module) {
  config.modules = config.modules.filter(item => item.package !== module);
  return updateGlobalSettings(config);
}

module.exports = {
  actionAddModule,
  actionRemoveModule,
};
