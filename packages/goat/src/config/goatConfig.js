const {
  readFile,
  stat,
} = require('fs').promises;
const { lt, gt, satisfies, major, minor } = require('semver');
const { version } = require('../../package.json');
const Notifier = require('@the-goat/notifier');
const configFile = './.goat/config';

/**
 * Check if goat is initialized and get the config
 * @returns {Object} config = Goat configuration containing used packages
 */
async function getConfig() {
  try {
    await stat('./.goat');
  } catch {
    const error = new Error(`No Goat project seems to be initiated here, please check your path or run ${Notifier.script('goat init')}`);
    error.name = 'NO_GOAT_PROJECT';
    throw error;
  }

  let config = JSON.parse(await readFile(configFile));
  const goatVersion = `${major(version)}.${minor(version)}.x`;
  if (satisfies(config.goatVersion, goatVersion)) {
    return config;
  }
  if (gt(version, config.goatVersion)) {
    const updateConfig = require('./modules/updateConfig');
    return updateConfig(config);
  }
  // If the version doesn't match on Minor,
  console.log('This project requires a newer version of Goat, please update');
  process.exit();
}

module.exports = getConfig;
