const updateNotifier = require('update-notifier');
const CollectCommands = require('./methods/commands/CollectCommands');
const setCommandWatch = require('./commands/watch');
const setCommandModule = require('./commands/module');
const setCommandProject = require('./commands/project');
const pkg = require('../package.json');
const { version } = require('../package.json');
const commander = require('commander');
const Notifier = require('./methods/notifications/notifyHandler');
const getPackages = require('./packages/getPackages');
let goat = new commander.Command();

async function base() {
  updateNotifier({ pkg }).notify();;
  goat
    .version(version)
    .name('Goat')
    .description('Goat');

  goat
    .option('-D, --debug', 'Debug Goat and modules');

  let config;
  try {
    config = await require('./config/goatConfig')();
  } catch(error) {
    const setCommandInit = require('./commands/init');
    goat.addCommand(setCommandInit());
    if (process.argv.length === 2) {
      Notifier.error(error.message);
     }
  }

  if (config) {
    const packages = await getPackages(config);
    const moduleCommands = await CollectCommands(packages);
    if (moduleCommands) {
      moduleCommands.forEach(command => {
        goat.addCommand(command);
      });
      goat.addCommand(setCommandWatch(packages));
    } 
  }
  
  goat.addCommand(setCommandProject());
  goat.addCommand(setCommandModule());
  goat.parse(process.argv);
}

module.exports = () => {
  global.DEBUG = process.argv.includes('--debug') || process.argv.includes('-D');
  if (global.DEBUG) {
    const timeFunction = require('./methods/debug/timeFunction');
    return timeFunction(base, 'goat');
  }
  base();
};
