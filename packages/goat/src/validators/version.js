const { validRange, satisfies } = require('semver');
const projectConfig = require('../../package.json');
const GoatNotifier = require('../notifier/notifier');

const Notifier = new GoatNotifier();

/**
 * Check if the current Goat version matches the local project settings
 * @param {String} version
 * @returns {Boolean} isValid
 */
const checkVersion = (version) => {
  if (!validRange(version)) {
    Notifier.error(`the configured ${projectConfig.name} version: ${Notifier.style.black().italic().bgWhite(version)} is not a valid semver version or semver range, please check the configured version`);
    return false;
  }
  const isValid = satisfies(projectConfig.version, version);
  if (!isValid) {
    Notifier.error(`The current installed version of ${projectConfig.name} does not satisfy the configs needs. \nCurrently: ${projectConfig.version}\nNeeds: ${version}\nPlease update ${projectConfig.name} by running ${Notifier.style.black().italic().bgWhite(`npm install ${projectConfig.name} -g`)}`);
    return false;
  }
  return isValid;
};

module.exports = checkVersion;
