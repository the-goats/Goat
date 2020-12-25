/**
 * Update the config with a given schema
 * @param {Object} schema
 */
function writeConfig(schema) {
  const { merge } = require('lodash');
  const { writeFileSync } = require('fs');
  const Notifier = require('../methods/notifications/notifier');
  const notifier = new Notifier();

  const configuration = require('../config/config')();
  const schemaConfig = require('./generateConfig')(schema);
  const configFileName = require('../methods/init/partials/configFileName');

  const projectConfiguration = merge({}, configuration, schemaConfig, configuration);
  if (JSON.stringify(configuration) === JSON.stringify(projectConfiguration)) {
    notifier.error('Couldn\'t update the configuration, please check the configuration yourself and/or notify the developer');
    return;
  }
  writeFileSync(configFileName, JSON.stringify(projectConfiguration, null, 2));
  notifier.log(`${notifier.emoji('white_check_mark')} updated the configuration, please check your settings before running your command again`);
}

module.exports = {
  updateConfig: writeConfig,
};
