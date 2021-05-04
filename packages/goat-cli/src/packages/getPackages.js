import { Goat } from '@the-goat/goat';
import loadModule from '../methods/modules/loadModule';

/**
 * Collect modules
 * @param {object} config
 * @returns {array} modules
 */
async function getModules({ modules }) {
  return modules
    .flatMap((item) => {
      if (global.DEBUG) {
        console.time(item.name);
      }
      // eslint-disable-next-line
      const module = loadModule(item);
      if (global.DEBUG) {
        console.timeEnd(item.name);
      }
      if (Array.isArray(module)) {
        return module.map((task) => task(Goat));
      }
      return module(Goat);
    })
    .filter((item) => !!item);
}

module.exports = getModules;
