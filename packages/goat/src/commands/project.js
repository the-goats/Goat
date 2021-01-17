const commander = require('commander');
const { projectModules } = require('../methods/modules/listModules');

/**
 * Create Project command
 * @returns {function} command
 */
function commandProject() {
  const program = new commander.Command('project')
    .description('Manage project')
    .action(async () => {
      try {
        await require('../config/goatConfig')();
      } catch (error) {
        const Notifier = require('@the-goat/notifier');
        Notifier.error(error.message);
      }
      program.help();
    });
  program.addCommand(commandListModules());
  return program;
}

/**
 * Display all project modules
 * @returns {function}
 */
function commandListModules() {
  return new commander.Command('module')
    .command('list')
    .alias('ls')
    .description('List modules')
    .action(projectModules);
}

module.exports = commandProject;
