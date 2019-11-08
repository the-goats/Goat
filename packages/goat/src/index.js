const initGoat = require('./commands/goat');
const setCommandInit = require('./commands/init');
const loadCommands = require('./commands/loadCommands');
const setCommandWatch = require('./commands/watch');

async function base() {
  let goat = initGoat();

  goat = setCommandInit(goat);
  if (!goat) {
    return;
  }

  goat = await loadCommands(goat);
  if (!goat) {
    return;
  }

  goat = await setCommandWatch(goat);

  goat.parse(process.argv);
  // No command specified
  if (goat.args.length === 0) {
    goat.help();
  }
}

module.exports = base;
