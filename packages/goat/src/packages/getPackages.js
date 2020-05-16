const Goat = require('../bootstrap/bootstrap');
const loadModule = require('../modules/loadModule');

/**
 * Collect modules
 * @param {object} config
 * @returns {array} modules
 */
async function getPackages({ modules }) {
  return modules.flatMap((item) => {
    // eslint-disable-next-line
    const module = loadModule(item);
    if (Array.isArray(module)) {
      return module.map(task => task(Goat));
    }
    return module(Goat);
  }).filter(item => !!item);
}



module.exports = getPackages;
