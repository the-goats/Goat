const { writeFile } = require('fs').promises;
const settingsRef = require('../../references/settings');

function updateGlobalSettings(config) {
  writeFile(settingsRef.settingsFile, JSON.stringify(config, null, 2));
}

module.exports = updateGlobalSettings;
