const importGlobal = require('import-global');
const Notifier = require('../notifications/notifyHandler');

/**
 * Require local or global module
 * @param {Object} module
 * @returns module
 */
function loadModule(module) {
  if (!module.global) {
    try {
      return require(module.package);
    } catch (error) {
      Notifier.error(`The module ${module.package} could not be loaded, please try updating goat or remove the module from your project config.`);
      process.exit();
    }
  }
  try {
    return importGlobal(module.package);
  } catch (error) {
    Notifier.error(`The module ${module.package} doesn't seem to be installed on your system`);
    Notifier.log(`Please install by running: ${Notifier.script(`goat module add ${module.package}`)}`);
    process.exit();
  }
}

module.exports = loadModule;
