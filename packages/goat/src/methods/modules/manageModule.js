const importGlobal = require('import-global');
const getGlobalConfig = require('../settings/getGlobalConfig');
const updateGlobalSettings = require('../settings/updateGlobalSettings');
const { xor } = require('lodash');

async function actionAddModule(module) {
  const config = await getGlobalConfig();
  if (checkInstalledModules(config, module)) {
    console.error(`${module} is already installed`);
    process.exit(0);
  }
  const modulePacakge = await getModulePackage(module);
  if (!modulePacakge.goat) {
    console.error(`${module} doesn\'t seem to be a Goat Module`);
    process.exit(1);
  }
  addModule(config, modulePacakge);
  console.log(`${module} is succesfully installed`);
}

async function actionRemoveModule(module) {
  const config = await getGlobalConfig();
  if (!checkInstalledModules(config, module)) {
    console.error(`${module} is not installed`);
    process.exit(0);
  }
  removeModule(config, module);
  console.log(`${module} is succesfully removed`);
}

function checkInstalledModules(config, module) {
  return Boolean(config.modules.filter(item => item.package === module).length);
}

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

function installModule(module) {
  const { promisify } = require('util');
  const exec = promisify(require('child_process').exec);
  try {
    return exec(`npm install ${module} -g`);
  } catch(error) {
    throw error;
  }
}

function addModule(config, moduleConfig, isDefault = false) {
  config.modules.push({
    name: moduleConfig.goat.name,
    package: moduleConfig.name,
    default: isDefault,
  });
  return updateGlobalSettings(config);
}

function removeModule(config, module) {
  config.modules = config.modules.filter(item => item.package !== module);
  return updateGlobalSettings(config);
}

module.exports = {
  actionAddModule,
  actionRemoveModule,
};
