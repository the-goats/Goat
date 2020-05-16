const Goat = require('../bootstrap/bootstrap');
const loadModule = require('../modules/loadModule');

/**
 * Collect modules
 * @param {object} config
 * @returns {array} modules
 */
async function getPackages({ functions }) {
  const modules = await require('../modules/collectModules');
  return modules.flatMap((item) => {
    if (!functions.includes(item.package)) {
      return null;
    }
    // eslint-disable-next-line
    const module = loadModule(item);
    if (Array.isArray(module)) {
      return module.map(task => task(Goat));
    }
    return module(Goat);
  }).filter(item => !!item);
}



module.exports = getPackages;
