const Notifier = require('@the-goat/notifier');
const commander = require('commander');
const watch = require('../events/watch');
const GoatEvents = require('../events/goatEvents');

commander.allowUnknownOption(true);

/**
 * Load watch capable tasks
 * @param {Object} config
 * @param {Array} packages
 */
async function loadWatchCommands(config, packages) {
  const watchPackages = packages.filter((module) => module.watch !== undefined);
  const events = new GoatEvents();
  watch(events);
  Notifier.log(Notifier.style.green('Watching Tasks:'));
  watchPackages.forEach((module) => Notifier.log(Notifier.style.green(`\t- ${module.name}`)));
  watchPackages.map((module) => module.watchBase(config, events));
}

/**
 * Create Watch command
 * @param {Array} packages
 * @returns {function}
 */
function setCommandWatch(packages) {
  const command = new commander.Command('watch')
    .command('watch')
    .alias('w')
    .description('Watch Tasks')
    .action((config) => loadWatchCommands(config, packages));
  Object.values(packages).forEach((pckg) => {
    if (pckg.options) {
      pckg.options.forEach((option) => {
        if (!option.allowOnWatch) {
          return;
        }
        command.option(option.flags, option.label);
      });
    }
  });
  return command;
}
module.exports = setCommandWatch;
