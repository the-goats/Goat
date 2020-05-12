const { stat } = require('fs').promises;
const { normalize } = require('path');
const configFileName = require('./modules/configFileName');
const initQuestions = require('./modules/questions');
const initializeGoatConfig = require('./modules/initConfig');
const initializeProjectConfig = require('./modules/projectConfig');
const getPackageInit = require('./modules/getPackageInitSettings');
const packageFiles = require('./modules/packageFiles');

/**
 * Initialize Goat inside the current folder, this is the entry point of this command.
 * @param {Object} options - Options for init function. { reset: {Boolean} }
 */
const action = async (options = {}) => {
  const init = async () => {
    const answers = await initQuestions();
    const initSettings = getPackageInit(answers.project_packages);
    initializeGoatConfig(answers);
    initializeProjectConfig(answers, initSettings);
    packageFiles(initSettings);
  };
  if (options.reset) {
    init();
    return;
  }

  try {
    await stat(normalize(`./${configFileName}`));
    console.log('Goat is already initialized');
    return;
  } catch (error) {
    init();
  }
};

module.exports = action;
