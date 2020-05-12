const { merge } = require('lodash');
const { writeFile } = require('fs').promises;
const getPackageConfig = require('./getPackageConfig');
const configFileName = require('./configFileName');

/**
 * Collect project config from included packages and write to a config file.
 * @param {Object} answers
 */
function initializeProjectConfig(answers, packages) {
  let projectConfiguration = {
    name: answers.project_name,
    version: '1.x',
  };
  packages.forEach((package) => {
    projectConfiguration = merge(projectConfiguration, getPackageConfig(package.init));
  });
  writeFile(configFileName, JSON.stringify(projectConfiguration, null, 2));
}

module.exports = initializeProjectConfig;
