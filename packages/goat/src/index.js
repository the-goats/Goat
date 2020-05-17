const updateNotifier = require('update-notifier');
const setCommandInit = require('./commands/init');
const CollectCommands = require('./commands/CollectCommands');
const setCommandWatch = require('./commands/watch');
const pkg = require('../package.json');
const { version } = require('../package.json');
const commander = require('commander');
let goat = new commander.Command();

async function base() {
  updateNotifier({ pkg }).notify();
  goat
    .version(version)
    .name('Goat')
    .description('Goat');

  const moduleCommands = await CollectCommands();
  if (moduleCommands) {
    moduleCommands.forEach(command => {
      goat.addCommand(command);
    });
  } else {
    goat.addCommand(setCommandInit());
  }

  goat.addCommand(await setCommandWatch());

  goat.parse(process.argv);
  // No command specified
  if (goat.args.length === 0) {
    goat.help();
  }
}

module.exports = base;
