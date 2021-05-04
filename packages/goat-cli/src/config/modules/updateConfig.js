import Notifier from '@the-goat/notifier';

/**
 * If current goat config does not match the current goat version, check if the config can be updated, otherwise prompt the user to reinitialize
 * @param {Object} config
 * @returns {Object} config
 */
async function updateConfig(config) {
  const { writeFile } = require('fs').promises;
  const { lte } = require('semver');
  const { normalize } = require('path');
  const { version } = require('../../../package.json');
  const configFile = './.goat/config';

  let newConfig = config;
  if (lte(newConfig.goatVersion, '1.4.0')) {
    const upgrade = require('../versionUpgrades/upgrade-1-4-0');
    newConfig = upgrade(newConfig);
  }
  newConfig.goatVersion = version;
  await writeFile(normalize(configFile), JSON.stringify(newConfig, null, 2));
  Notifier.log('The Goat version of this project has been updated, no further changes needed');
  return newConfig;
}

module.exports = updateConfig;
