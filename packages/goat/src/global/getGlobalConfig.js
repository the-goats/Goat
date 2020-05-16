const {
  access,
  writeFile,
  readFile,
  F_OK,
} = require('fs').promises;
const homedir = require('os').homedir();
const Notify = require('../notifier/notifier');
const folder = `${homedir}/.goat`;
const file = 'settings';
const settingsFile = `${folder}/${file}`;
const Notifier = new Notify();

/**
 * Check if Global config exists and retrieve it.
 * @returns {Promise} config
 */
function getGlobalConfig() {
  return new Promise((resolve, reject) => {
    access(settingsFile, F_OK)
    .then(async() => {
      try {
        resolve(await loadConfig());
      } catch(error) {
        Notifier.error('The format of the global Goat config is invalid, please fix this manually or remove the file to let Goat reinitialize it');
        resolve({});
      }
    })
    .catch((error) => {
      createGlobalConfig()
        .then(config => resolve(config))
        .catch(error => reject(error));
    });
  });
};

/**
 * Load the global Goat config
 * @returns {Promise} config
 */
function loadConfig() {
  return new Promise(async (resolve, reject) => {
    try {
      const config = JSON.parse(await readFile(settingsFile));
      resolve(config);
    } catch(error) {
      reject(error);
    }
  });
}

/**
 * Create the global Goat directory
 * @returns {Promise} config
 */
function createGlobalConfig() {
  return new Promise((resolve, reject) => {
    const config = require('../modules/.goat.settings.js');
    const mkdirp = require('mkdirp');
    mkdirp(folder)
    .then(async () => {
      writeFile(`${folder}/${file}`, JSON.stringify(config, null, 2));
      resolve(await loadConfig());
    })
    .catch(error => reject(error));
  });
}

module.exports = getGlobalConfig;