import Notifier from '@the-goat/notifier';
import { goatConfig } from '@the-goat/goat';
import CollectCommands from './methods/commands/CollectCommands';
import getPackages from './packages/getPackages';

const updateNotifier = require('update-notifier');
const commander = require('commander');
const setCommandWatch = require('./commands/watch');
const setCommandBuild = require('./commands/build');
const setCommandModule = require('./commands/module');
const setCommandProject = require('./commands/project');
const pkg = require('../package.json');

const goat = new commander.Command();

async function base() {
  updateNotifier({ pkg }).notify();
  goat
    .version(pkg.version, '-v, -V, --version', 'output the current version')
    .name('Goat')
    .description('Goat');

  let config;
  try {
    config = await goatConfig();
  } catch (error) {
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
      moduleCommands.forEach((command) => {
        goat.addCommand(command);
      });
      goat.addCommand(setCommandWatch(packages));
      goat.addCommand(setCommandBuild(packages));
    }
  }

  goat.addCommand(setCommandProject());
  goat.addCommand(setCommandModule());
  goat.allowUnknownOption(true);
  goat.parse(process.argv);
}

export default base;
