const fs = require('fs');
const Notifier = require('@the-goat/notifier');
const schemaBase = require('../schemas/schema');
const checkSchema = require('../validators/schema');
const checkVersion = require('../validators/version');

const configPath = './goat.config.json';

/**
 * Parse configuration object
 * @returns
 */
function parseConfig(config) {
  try {
    return JSON.parse(config);
  } catch (error) {
    Notifier.error('Your config file is not valid JSON, please check your config file');
    process.exit();
    return null;
  }
}

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
  const buffer = fs.readFileSync(configPath);
  return parseConfig(buffer);
}

/**
 * Validate configuration object
 * @returns
 */
function validateConfig(config) {
  let isValid = true;

  // Validate used config
  if (!checkSchema(config, schemaBase)) {
    isValid = false;
  }

  // Validate config version
  if (!checkVersion(config.version)) {
    isValid = false;
  }
  return isValid;
}

module.exports = {
  getConfig,
  parseConfig,
  validateConfig,
};
