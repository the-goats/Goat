const init = require('../init/init');

/**
 * Define Init command
 * @param {object} goat
 * @returns {object} goat
 */
function setCommandInit(goat) {
  goat
    .command('init')
    .alias('i')
    .description('Initialize Goat')
    .action(() => init());
  if (process.argv[2] === 'init') {
    goat.parse(process.argv);
    return;
  }
  // eslint-disable-next-line
  return goat;
}

module.exports = setCommandInit;
