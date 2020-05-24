const commander = require('commander');
const getPackages = require('../packages/getPackages');
const watch = require('../events/watch');
const GoatEvents = require('../events/goatEvents');
const Notifier = require('../methods/notifications/notifyHandler');

/**
 * Load watch capable tasks
 * @returns {array} packages;
 */
async function loadWatchCommands() {
  // eslint-disable-next-line
  const config = await require('../config/goatConfig')();
  if (!config) {
    return;
  }
  const packages = await getPackages(config);
  const watchPackages = packages.filter(module => module.watch !== undefined);
  const events = new GoatEvents();
  watch(events);
  Notifier.log(Notifier.style.green('Watching Tasks:'));
  watchPackages.forEach(module => Notifier.log(Notifier.style.green(`\t- ${module.name}`)));
  watchPackages.map(module => module.watchBase(events));
}

/**
 * Create Watch command
 * @returns {function} command
 */
function setCommandWatch() {
  return new commander.Command('watch')
    .command('watch')
    .alias('w')
    .description('Watch Tasks')
    .action(() => loadWatchCommands());
}

module.exports = setCommandWatch;
