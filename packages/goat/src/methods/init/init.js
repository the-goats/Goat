const { stat } = require('fs').promises;
const { normalize } = require('path');
const Notifier = require('@the-goat/notifier');
const configFileName = require('./partials/configFileName');
const initQuestions = require('./partials/questions');
const initializeGoatConfig = require('./partials/initConfig');
const initializeProjectConfig = require('./partials/projectConfig');
const getPackageInit = require('./partials/getPackageInitSettings');
const packageFiles = require('./partials/packageFiles');

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
    Notifier.log('Goat is already initialized');
    return;
  } catch (error) {
    init();
  }
};

module.exports = action;
