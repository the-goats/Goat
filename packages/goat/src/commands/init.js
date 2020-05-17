const init = require('../init/init');
const commander = require('commander');

/**
 * Create Init command
 * @returns {function} command
 */
function setCommandInit() {
  return new commander.Command('init')
    .command('init')
    .alias('i')
    .description('Initialize Goat')
    .action(() => init());
}

module.exports = setCommandInit;
