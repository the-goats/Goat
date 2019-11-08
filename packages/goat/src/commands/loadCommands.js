const getPackages = require('../packages/getPackages');

/**
 * Load commands defined by the plugins
 * @param {object} goat
 * @returns {object} goat
 */
async function loadCommands(goat) {
  let newGoat = goat;
  // eslint-disable-next-line
  const config = await require('../config/goatConfig')();
  if (!config) {
    return;
  }

  const packages = getPackages(config);
  packages.forEach((plugin) => {
    newGoat = plugin.getCommand(newGoat);
  });
  // eslint-disable-next-line
  return newGoat;
}

module.exports = loadCommands;
