const { merge } = require('lodash');
const { writeFile } = require('fs').promises;
const getPackageConfig = require('./getPackageConfig');

/**
 * Collect project config from included packages and write to a config file.
 * @param {Object} answers
 */
function initializeProjectConfig(answers, packages) {
  let projectConfiguration = {
    name: answers.project_name,
    version: '2.x',
  };
  packages.forEach((pckg) => {
    projectConfiguration = merge(projectConfiguration, getPackageConfig(pckg));
  });
  writeFile('goat.config.json', JSON.stringify(projectConfiguration, null, 2));
}

module.exports = initializeProjectConfig;
