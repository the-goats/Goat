var pkg = require('../package.json');
var semver = require('semver');

module.exports = function goat() {
  if (!semver.satisfies(process.version, pkg.engines.node)) {
    process.stderr.write([
        'Invalid node version',
        process.version,
        'requires',
        pkg.engines.node,
        '\n'
    ].join(' '));
    process.exit(-1);
  }
  return require('/cli.js');
};
