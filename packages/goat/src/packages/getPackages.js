const Goat = require('../bootstrap/bootstrap');
const plugins = require('../../plugins');

/**
 * Collect plugins
 * @param {object} config
 * @returns {array} plugins
 */
function getPackages({ functions }) {
  return plugins.flatMap((item) => {
    if (!functions.includes(item.package)) {
      return null;
    }
    // eslint-disable-next-line
    const plugin = require(item.package);
    if (Array.isArray(plugin)) {
      return plugin.map(task => task(Goat));
    }
    return plugin(Goat);
  }).filter(item => !!item);
}

module.exports = getPackages;
