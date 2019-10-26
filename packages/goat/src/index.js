'use strict';

/**
 * Initialize commander instance as goat
 * @returns {object} goat
 */
const initGoat = () => {
  let goat = require('commander');
  const {
    version
  } = require('../package.json');

  goat
    .version(version)
    .description('Goat');
  return goat;
}
 
/**
 * Define Init command
 * @param {object} goat
 * @returns {object} goat
 */
const setCommandInit = (goat) => {
  const init = require('./actions/init');
  goat
    .command('init')
    .alias('i')
    .description('Initialize Goat')
    .action(() => init());
  if (process.argv[2] === 'init') {
    goat.parse(process.argv);
    return
  }
  return goat
}

/**
 * Collect plugins
 * @param {object} config
 * @returns {array} plugins
 */
const getPackages = ({ functions }) => {
  const Goat = require('./bootstrap/bootstrap');
  const plugins = require('../plugins');
  return plugins.flatMap(item => {
    if (!functions.includes(item.package)) {
      return null;
    }
    const plugin = require(item.package);
    if (Array.isArray(plugin)) {
      return plugin.map(item => item(Goat));
    }
    return plugin(Goat);
  }).filter(item => !!item);
};

/**
 * Load commands defined by the plugins
 * @param {object} goat
 * @returns {object} goat
 */
const loadCommands = async (goat) => {
  const config = await require('./config/goatConfig')();
  if (!config) {
    return
  }

  const packages = getPackages(config);
  packages.forEach((plugin) => {
    goat = plugin.getCommand(goat);
  });
  return goat;
}

/**
 * Load watch capable tasks
 * @returns {array} packages;
 */
const loadWatchCommands = async () => {
  const config = await require('./config/goatConfig')();
  if (!config) {
    return
  }
  const packages = getPackages(config);
  const watchPackages = packages.filter((plugin) => plugin.watch !== undefined);
  const { watch, goatEvents } = require('./bootstrap/watch');
  const events = new goatEvents();
  watch(events);
  watchPackages.map(plugin => plugin.watchBase(events));
  return;
}

/**
 * Add watch command to goat
 * @param {object} goat
 * @returns {object} goat
 */
const setCommandWatch = (goat) => {
  goat
    .command('watch')
    .alias('w')
    .description('Watch Tasks')
    .action(() => loadWatchCommands());
  return goat;
}

/**
 * Add watch command to goat
 * @param {object} goat
 * @returns {object} goat
 */
const goatTest = (goat) => {
  const { watch } = require('./bootstrap/watch')
  goat
    .command('test')
    .alias('t')
    .description('Test Task')
    .action(() => watch());
  return goat;
}

async function goat () {
  let goat = initGoat();

  goat = setCommandInit(goat);
  if (!goat) {
    return;
  }

  goat = await loadCommands(goat);  

  goat = await setCommandWatch(goat);

  goat = await goatTest(goat);
  
  goat.parse(process.argv);
  // No command specified
  if (goat.args.length === 0) {
    goat.help();
  }
}

module.exports = goat;
