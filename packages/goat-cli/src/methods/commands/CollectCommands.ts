/**
 * Collect commands defined by the modules
 */
async function CollectCommands(packages: Array<{ getCommand: () => string }>) {
  return packages.map((module) => module.getCommand());
}

export default CollectCommands;
