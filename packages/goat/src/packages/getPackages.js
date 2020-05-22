const Goat = require('../bootstrap/bootstrap');
const loadModule = require('../methods/modules/loadModule');

/**
 * Collect modules
 * @param {object} config
 * @returns {array} modules
 */
async function getModules({ modules }) {
  return modules.flatMap((item) => {
    // eslint-disable-next-line
    const module = loadModule(item);
    if (Array.isArray(module)) {
      return module.map(task => task(Goat));
    }
    return module(Goat);
  }).filter(item => !!item);
}



module.exports = getModules;
