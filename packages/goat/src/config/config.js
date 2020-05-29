const fs = require('fs');
const schemaBase = require('../schemas/schema');
const checkSchema = require('../validators/schema');
const checkVersion = require('../validators/version');
const Notifier = require('../methods/notifications/notifyHandler');
const configPath = './goat.config.json';

/**
 * Get configuration object
 * @returns
 */
function getConfig() {
  if (!fs.existsSync(configPath)) {
    Notifier.error('No config file could be found, please check your path or create a \'goat.config.json\' file');
    return null;
  }
  // Read config
  const file = fs.readFileSync(configPath);
  let config;
  try {
    config = JSON.parse(file);
  } catch (error) {
    Notifier.error('Your config file is not valid JSON, please check your config file');
    return null;
  }

  // Validate used config
  if (!checkSchema(config, schemaBase)) {
    return null;
  }

  // Validate config version
  if (!checkVersion(config.version)) {
    return null;
  }
  return config;
}

module.exports = getConfig;
