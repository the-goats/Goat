const importGlobal = require('import-global');
const Notify = require('../../notifier/notifier');
const Notifier = new Notify();

/**
 * Require local or global module
 * @param {object} module
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
    Notifier.log(`Please install by running: ${Notifier.style.black(Notifier.style.bgYellow(` npm install ${module.package} -g `))}`)
    process.exit();
  }
}

module.exports = loadModule;
