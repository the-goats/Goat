const {
  readFile,
  stat,
} = require('fs').promises;
const { eq } = require('semver');
const { version } = require('../../package.json');
const GoatNotifier = require('../notifier/notifier');
const updateConfig = require('./modules/updateConfig');

const Notifier = new GoatNotifier();
const configFile = './.goat/config';

/**
 * Check if goat is initialized and get the config
 * @returns {Object} config = Goat configuration containing used packages
 */
async function getConfig() {
  try {
    await stat('./.goat');
  } catch (error) {
    Notifier.error('No Goat project seems to be initiated here, please check your path or run `goat init`');
    return null;
  }

  let config = JSON.parse(await readFile(configFile));

  if (!eq(version, config.goatVersion)) {
    config = updateConfig(config);
  }
  return config;
}

module.exports = getConfig;
