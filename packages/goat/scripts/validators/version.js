const { validRange, satisfies } = require('semver');
const GoatNotifier = require('../notifier');
const Notifier = new GoatNotifier;
const package = require('../../package.json');
const {
  black
} = require('kleur');

/**
 * Check if the current Goat version matches the local project settings
 * @param {String} version
 * @returns {Boolean} isValid
 */
const checkVersion = (version) => {
  if (!validRange(version)) {
    Notifier.error(`the configured ${package.name} version: ${Notifier.style.black().italic().bgWhite(version)} is not a valid semver version or semver range, please check the configured version`)
    return false;
  }
  const isValid = satisfies(package.version, version);
  if (!isValid) {
    Notifier.error(`The current installed version of ${package.name} does not satisfy the configs needs. \nCurrently: ${package.version}\nNeeds: ${version}\nPlease update ${package.name} by running ${Notifier.style.black().italic().bgWhite(`npm install ${package.name} -g`)}`);
    return false;
  }
  return isValid
}

module.exports = checkVersion;