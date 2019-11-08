const { merge } = require('lodash');
const { writeFile } = require('fs').promises;
const Goat = require('../../bootstrap/bootstrap');
const getPackageConfig = require('./getPackageConfig');
const configFileName = require('./configFileName');

/**
 * Collect project config from included packages and write to a config file.
 * @param {Object} answers
 */
function initializeProjectConfig(answers) {
  let projectConfiguration = {
    name: answers.project_name,
    version: '1.x',
  };
  answers.project_packages.forEach((plugin) => {
    // eslint-disable-next-line
    const packageConfig = require(plugin);
    projectConfiguration = merge(projectConfiguration, getPackageConfig(packageConfig, Goat));
  });
  writeFile(configFileName, JSON.stringify(projectConfiguration, null, 2));
}

module.exports = initializeProjectConfig;
