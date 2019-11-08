const goat = require('commander');
const { version } = require('../../package.json');

/**
 * Initialize commander instance as goat
 * @returns {object} goat
 */
function initGoat() {
  goat
    .version(version)
    .description('Goat');
  return goat;
}

module.exports = initGoat;
