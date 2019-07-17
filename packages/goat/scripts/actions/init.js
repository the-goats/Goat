const inquirer = require('inquirer');
const {
  merge
} = require('lodash');
const {
  writeFile,
  stat,
  mkdir,
} = require('fs').promises;
const {
  normalize
} = require('path');

const configFileName = 'goat.config.json';
const directory = normalize(`./.goat`);
const { version } = require('../../package.json');

/**
 * Inquire the user preferences.
 * @returns {Object} answers
 */
const initQuestions = async () => {
  const questions = [{
      type: 'input',
      name: 'project_name',
      message: 'What\'s the name of your project ? ',
      default: () => {
        const path = process.cwd();
        return path.substring(path.lastIndexOf('\\') > -1 ? path.lastIndexOf('\\') : path.lastIndexOf('/') + 1);
      },
    },
    {
      type: 'checkbox',
      message: 'Select packages',
      name: 'project_packages',
      choices: [{
          name: 'Goat Styles',
          value: '@goatstyles',
        },
        {
          name: 'Goat JS',
          value: '@goat/js',
        },
        {
          name: 'Goat Modernizr',
          value: '@goat/modernizr',
        },
      ],
      default: () => {
        return ['goat-styles', 'goat-js', 'goat-modernizr'];
      }
    }
  ];

  return inquirer.prompt(questions)
}

/**
 * create .goat directory and write base configuration to a config file.
 * @param {Object} answers
 */
const initializeGoatConfig = async (answers) => {
  const writeConfig = () => {
    const goatConfig = {
      goatVersion: version,
      functions: answers['project_packages'],
    }
    writeFile(normalize(`${directory}/config`), JSON.stringify(goatConfig, null, 2));
  }
  try {
    const allReadyInitialized = await stat(directory);
    writeConfig();
  } catch {
    mkdir(directory, {})
    .then(() => {
      writeConfig();
    })
  }
 
  return
}

/**
 * Collect project config from included packages and write to a config file.
 * @param {Object} answers
 */
const initializeProjectConfig = (answers) => {
  let projectConfiguration = {
    name: answers['project_name'],
    version: '1.x',
  }
  answers['project_packages'].forEach(package => {
    projectConfiguration = merge(projectConfiguration, require(package).init.configuration)
  });
  writeFile(configFileName, JSON.stringify(projectConfiguration, null, 2));
}

/**
 * Initialize Goat inside the current folder, this is the entry point of this command.
 * @param {Object} options - Options for init function. { reset: {Boolean} }
 */
const action = async (options = {}) => {
  const init = async () => {
    const answers = await initQuestions();
    initializeGoatConfig(answers);
    initializeProjectConfig(answers);
  }
  if (options.reset) {
    init();
    return
  }
  
  try {
    const allReadyInitialized = await stat(normalize(`./${configFileName}`));
    console.log('Goat is already initialized');
    return
  } catch {
    init();
  }
};

module.exports = action;