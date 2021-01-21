/**
 * Collect commands defined by the modules
 * @param {Array} packages
 * @returns {Array} commands
 */
async function CollectCommands(packages) {
  return packages.map((module) => module.getCommand());
}

module.exports = CollectCommands;
