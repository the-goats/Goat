const getPackages = require('../packages/getPackages');

/**
 * Collect commands defined by the modules
 * @returns {array} commands
 */
async function CollectCommands() {
  // eslint-disable-next-line
  const config = await require('../config/goatConfig')();
  if (!config) {
    return;
  }

  const packages = await getPackages(config);
  return packages.map(module => module.getCommand());
}

module.exports = CollectCommands;
