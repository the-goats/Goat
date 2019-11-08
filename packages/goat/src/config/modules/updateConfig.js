const { writeFile } = require('fs').promises;
const {
  major,
  satisfies,
} = require('semver');
const { normalize } = require('path');
const { version } = require('../../../package.json');
const init = require('../../init/init');

const configFile = './.goat/config';

/**
 * If current goat config does not match the current goat version, check if the config can be updated, otherwise prompt the user to reinitialize
 * @param {Object} config
 * @returns {Object} config
 */
function updateConfig(config) {
  const newConfig = config;
  if (satisfies(config.goatVersion, `${major(version)}.x.x`)) {
    newConfig.goatVersion = version;
    writeFile(normalize(configFile), JSON.stringify(config, null, 2));
    console.log('The Goat version of this project has been updated, no further changes needed');
    return newConfig;
  }

  console.log(`Versions to far apart, please reinitialize Goat\nGoat version: ${version}\nProject version: ${config.goatVersion}`);
  init({
    reset: true,
  });
  return null;
}

module.exports = updateConfig;
