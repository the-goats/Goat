const { stat } = require('fs').promises;
const { normalize } = require('path');
const configFileName = require('./modules/configFileName');
const initQuestions = require('./modules/questions');
const initializeGoatConfig = require('./modules/initConfig');
const initializeProjectConfig = require('./modules/projectConfig');

/**
 * Initialize Goat inside the current folder, this is the entry point of this command.
 * @param {Object} options - Options for init function. { reset: {Boolean} }
 */
const action = async (options = {}) => {
  const init = async () => {
    const answers = await initQuestions();
    initializeGoatConfig(answers);
    initializeProjectConfig(answers);
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
