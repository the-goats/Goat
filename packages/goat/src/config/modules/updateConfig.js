const { writeFile } = require('fs').promises;
const {
  major,
  satisfies,
  lte,
} = require('semver');
const { normalize } = require('path');
const { version } = require('../../../package.json');
const Notifier = require('../../methods/notifications/notifyHandler');
const configFile = './.goat/config';

/**
 * If current goat config does not match the current goat version, check if the config can be updated, otherwise prompt the user to reinitialize
 * @param {Object} config
 * @returns {Object} config
 */
async function updateConfig(config) {
  let newConfig = config;
  if (lte(newConfig.goatVersion, '1.4.0')) {
    const upgrade = require('../versionUpgrades/upgrade-1-4-0');
    newConfig = upgrade(newConfig);
  }
  if (satisfies(config.goatVersion, `${major(version)}.x.x`)) {
    newConfig.goatVersion = version;
    await writeFile(normalize(configFile), JSON.stringify(config, null, 2));
    Notifier.log('The Goat version of this project has been updated, no further changes needed');
    return newConfig;
  }

  Notifier.log(`Versions to far apart, please reinitialize Goat\nGoat version: ${version}\nProject version: ${config.goatVersion}`);
  reInit();
  return null;
}

function reInit() {
  const init = require('../../methods/init/init');
  init({
    reset: true,
  });
}

module.exports = updateConfig;
