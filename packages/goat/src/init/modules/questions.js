const inquirer = require('inquirer');

/**
 * Inquire the user preferences.
 * @returns {Object} answers
 */
async function initQuestions() {
  const modules = await require('../../methods/modules/collectModules');
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
    choices: modules.map(item => ({
      ...item,
      value: item,
    })),
    default: () => ((modules.map((item) => {
      if (!item.default) {
        return null;
      }
      return item;
    })).filter(item => item !== null)),
  },
  ];

  return inquirer.prompt(questions);
}

module.exports = initQuestions;
