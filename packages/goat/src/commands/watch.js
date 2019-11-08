const getPackages = require('../packages/getPackages');
const Notify = require('../notifier/notifier');
const watch = require('../events/watch');
const GoatEvents = require('../events/goatEvents');

const Notifier = new Notify();

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
  const packages = getPackages(config);
  const watchPackages = packages.filter(plugin => plugin.watch !== undefined);
  const events = new GoatEvents();
  watch(events);
  Notifier.log(Notifier.style.green('Watching Tasks:'));
  watchPackages.forEach(plugin => Notifier.log(Notifier.style.green(`\t- ${plugin.name}`)));
  watchPackages.map(plugin => plugin.watchBase(events));
}

/**
 * Add watch command to goat
 * @param {object} goat
 * @returns {object} goat
 */
function setCommandWatch(goat) {
  goat
    .command('watch')
    .alias('w')
    .description('Watch Tasks')
    .action(() => loadWatchCommands());
  return goat;
}

module.exports = setCommandWatch;
