const commander = require('commander');
const { actionAddModule, actionRemoveModule } = require('../methods/modules/manageModule');

/**
 * Create Settings command
 * @returns {function} command
 */
function commandSettings() {
  const program =  new commander.Command('module')
  .description('Manage Goat modules')
  program.addCommand(commandAddModule());   
  program.addCommand(commandRemoveModule());   
  return program;
}

function commandAddModule() {
  return new commander.Command('module')
    .command('add <module>')
    .description('Add module to Goat')
    .action(actionAddModule);
}

function commandRemoveModule() {
  return new commander.Command('module')
    .command('remove <module>')
    .description('Remove module from Goat')
    .action(actionRemoveModule);
}

module.exports = commandSettings;
