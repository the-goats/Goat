/**
 * Update the config with a given schema
 * @param {Object} schema
 */
function writeConfig(schema) {
  const Notifier = require('@the-goat/notifier');
  const { merge } = require('lodash');
  const { writeFileSync } = require('fs');

  const { getConfig } = require('../config/config');
  const configuration = getConfig();

  const schemaConfig = require('./generateConfig')(schema);
  const configFileName = require('../methods/init/partials/configFileName');

  const projectConfiguration = merge({}, configuration, schemaConfig, configuration);
  if (JSON.stringify(configuration) === JSON.stringify(projectConfiguration)) {
    Notifier.error('Couldn\'t update the configuration, please check the configuration yourself and/or notify the developer');
    return;
  }
  writeFileSync(configFileName, JSON.stringify(projectConfiguration, null, 2));
  Notifier.log(`${Notifier.emoji('white_check_mark')}  updated the configuration, please check your settings before running your command again`);
}

module.exports = {
  updateConfig: writeConfig,
};
