const importGlobal = require('import-global');

/**
 * Require local or global module
 * @param {object} module
 * @returns module
 */
function loadModule(module) {
  if (!module.global) {
    return require(module.package)
  }
  return importGlobal(module.package);
}

module.exports = loadModule;
