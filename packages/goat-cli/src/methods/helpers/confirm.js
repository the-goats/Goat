const inquirer = require('inquirer');

/**
 * Request confirmation form the user
 * @param {Object} prompt
 * @returns {Boolean}
 */
async function confirm(prompt) {
  try {
    const result = await inquirer
      .prompt([{
        ...prompt,
        type: 'confirm',
        name: 'confirm',
      }]);
    return result.confirm;
  } catch (error) {
    return false;
  }
}

module.exports = confirm;
