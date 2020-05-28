const commander = require('commander');
const watch = require('../events/watch');
const GoatEvents = require('../events/goatEvents');
const Notifier = require('../methods/notifications/notifyHandler');

/**
 * Load watch capable tasks
 * @param {Array} packages
 */
async function loadWatchCommands(packages) {
  const watchPackages = packages.filter(module => module.watch !== undefined);
  const events = new GoatEvents();
  watch(events);
  Notifier.log(Notifier.style.green('Watching Tasks:'));
  watchPackages.forEach(module => Notifier.log(Notifier.style.green(`\t- ${module.name}`)));
  watchPackages.map(module => module.watchBase(events));
}

/**
 * Create Watch command
 * @param {Array} packages
 * @returns {function}
 */
function setCommandWatch(packages) {
  return new commander.Command('watch')
    .command('watch')
    .alias('w')
    .description('Watch Tasks')
    .action(() => loadWatchCommands(packages));
}

module.exports = setCommandWatch;
