/**
 * Collect commands defined by the modules
 */
import { Goat } from '@the-goat/core';

async function CollectCommands(packages: Goat[]) {
  return packages.map((module) => module.getCommand());
}

export default CollectCommands;
