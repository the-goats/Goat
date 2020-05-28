const {
  readFile,
  stat,
} = require('fs').promises;
const { lt, gt, satisfies, major } = require('semver');
const { version } = require('../../package.json');
const Notifier = require('../methods/notifications/notifyHandler');
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
  console.log(satisfies(config.goatVersion, `>=${major(version)}.0.0 <2.0.0-0`));
  if (!satisfies(config.goatVersion, `${major(version)}.x.x`)) {
    console.log('This project requires a newer version of Goat, please update');
    process.exit();
  }
  if (gt(version, config.goatVersion)) {
    const updateConfig = require('./modules/updateConfig');
    return updateConfig(config);
  }
  return config;
}

module.exports = getConfig;
