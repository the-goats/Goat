const { normalize } = require('path');
const homedir = require('os').homedir();
const folder = `${homedir}/.goat`;
const file = 'settings';
const settingsFile = normalize(`${folder}/${file}`);

module.exports = {
  folder,
  file,
  settingsFile,
};
