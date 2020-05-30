const commander = require('commander');
const { actionAddModule, actionRemoveModule } = require('../methods/modules/manageModule');
const { listModules } = require('../methods/modules/listModules');

/**
 * Create Module command
 * @returns {function} command
 */
function commandModule() {
  const program =  new commander.Command('module')
  .description('Manage Goat modules')
  program.addCommand(commandListModules());   
  program.addCommand(commandAddModule());   
  program.addCommand(commandRemoveModule());   
  return program;
}

/**
 * Display all available modules
 * @returns
 */
function commandListModules() {
  return new commander.Command('module')
    .command('list')
    .alias('ls')
    .description('List modules')
    .action(listModules);
}

/**
 * Add a module to goat
 * @returns {function}
 */
function commandAddModule() {
  return new commander.Command('module')
    .command('add <module>')
    .description('Add module to Goat')
    .action(actionAddModule);
}

/**
 * remove a module from goat
 * @returns {function}
 */
function commandRemoveModule() {
  return new commander.Command('module')
    .command('remove <module>')
    .description('Remove module from Goat')
    .action(actionRemoveModule);
}

module.exports = commandModule;
