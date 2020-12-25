const { normalize } = require('path');
const {
  writeFile,
  stat,
  mkdir,
} = require('fs').promises;
const { omit } = require('lodash');
const { version } = require('../../../../package.json');

const directory = normalize('./.goat');

/**
 * create .goat directory and write base configuration to a config file.
 * @param {Object} answers
 */
async function initializeGoatConfig(answers) {
  const writeConfig = () => {
    const goatConfig = {
      goatVersion: version,
      functions: answers.project_packages.map((module) => module.package),
      modules: answers.project_packages.map((module) => omit(module, ['default'])),
    };
    writeFile(normalize(`${directory}/config`), JSON.stringify(goatConfig, null, 2));
  };
  try {
    await stat(directory);
    writeConfig();
  } catch (error) {
    mkdir(directory, {})
      .then(() => {
        writeConfig();
      });
  }
}

module.exports = initializeGoatConfig;
