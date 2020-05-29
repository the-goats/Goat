const { writeFile } = require('fs').promises;
const settingsRef = require('../../references/settings');

/**
 * Write update to global settings
 * @param {Object} config
 */
function updateGlobalSettings(config) {
  writeFile(settingsRef.settingsFile, JSON.stringify(config, null, 2));
}

module.exports = updateGlobalSettings;
