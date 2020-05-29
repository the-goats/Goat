const importGlobal = require('import-global');
const Notifier = require('../notifications/notifyHandler');

/**
 * Require local or global module
 * @param {Object} module
 * @returns module
 */
function loadModule(module) {
  if (!module.global) {
    return require(module.package)
  }
  try {
    return importGlobal(module.package);
  } catch(error) {
    Notifier.error(`The module ${module.package} doesn't seem to be installed on your system`)
    Notifier.log(`Please install by running: ${Notifier.script(`goat module add ${module.package}`)}`)
    process.exit();
  }
}

module.exports = loadModule;
