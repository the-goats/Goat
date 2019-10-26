const {
  readFile,
  stat,
  writeFile,
} = require('fs').promises;
const {
  version
} = require('../../package.json');
const {
  eq,
  major,
  satisfies,
} = require('semver');
const { normalize } = require('path');
const GoatNotifier = require('../notifier');
const Notifier = new GoatNotifier;
const init = require('../actions/init');
const configFile = './.goat/config';

/**
 * Check if goat is initialized and get the config
 * @returns {Object} config = Goat configuration containing used packages
 */
const getConfig = async () => {
  try {
    await stat('./.goat')
  } catch {
    Notifier.error('No Goat project seems to be initiated here, please check your path or run \`goat init\`')
    return null
  }

  let config = JSON.parse(await readFile(configFile));

  if (!eq(version, config.goatVersion)) {
    config = updateConfig(config);
  }
  return config;
};

/**
 * If current goat config does not match the current goat version, check if the config can be updated, otherwise prompt the user to reinitialize
 * @param {Object} config
 * @returns {Object} config
 */
const updateConfig = (config) => {
  if (satisfies(config.goatVersion, `${major(version)}.x.x`)) {
    config.goatVersion = version;
    writeFile(normalize(configFile), JSON.stringify(config, null, 2));
    console.log('The Goat version of this project has been updated, no further changes needed')
    return config
  }

  console.log(`Versions to far apart, please reinitialize Goat\nGoat version: ${version}\nProject version: ${config.goatVersion}`);
  init({
    reset: true
  });
  return null
}

module.exports = getConfig;