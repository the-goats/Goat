const updateNotifier = require('update-notifier');
const CollectCommands = require('./methods/commands/CollectCommands');
const setCommandWatch = require('./commands/watch');
const setCommandGlobal = require('./commands/global');
const pkg = require('../package.json');
const { version } = require('../package.json');
const commander = require('commander');
let goat = new commander.Command();

async function base() {
  console.time('goat');
  updateNotifier({ pkg }).notify();;
  goat
    .version(version)
    .name('Goat')
    .description('Goat');

  const config = await require('./config/goatConfig')();
  if (!config) {
    const setCommandInit = require('./commands/init');
    goat.addCommand(setCommandInit());
    return parseGoat(goat);
  }
  
  const moduleCommands = await CollectCommands(config);
  if (moduleCommands) {
    moduleCommands.forEach(command => {
      goat.addCommand(command);
    });
    goat.addCommand(setCommandWatch());
  }

  goat.addCommand(setCommandGlobal());
  
  console.timeEnd('goat');
  return parseGoat(goat);
}

function parseGoat(goat) {
  goat.parse(process.argv);
  // No command specified
  if (goat.args.length === 0) {
    goat.help();
  }
}

module.exports = base;
