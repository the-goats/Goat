const Notifier = require('@the-goat/notifier');
const commander = require('commander');
const Bluebird = require('bluebird');

// commander.allowUnknownOption(true);

/**
 * Load build capable tasks
 * @param {Object} config
 * @param {Array} packages
 */
async function loadBuildCommands(config, packages) {
  const buildPackages = packages.filter((module) => module.method !== undefined);
  Notifier.log(Notifier.style.green('Building Tasks:'));
  Bluebird.mapSeries(buildPackages, (module) => {
    Notifier.log(Notifier.style.green(`\t- START ${module.name}`));
    const resultPromise = module.actionBase(config);
    if (!resultPromise) {
      Notifier.log(Notifier.style.red(`\t- NO TASK RESULT FOR ${module.name}: CONTACT GOATKEEPER TO FIX PACKAGE`));
    }
    return resultPromise;
  });
}

/**
 * Create Build command
 * @param {Array} packages
 * @returns {function}
 */
function setCommandBuild(packages) {
  return new commander.Command('build')
    .command('build')
    .alias('b')
    .description('Build (execute all tasks)')
    .action((config) => loadBuildCommands(config, packages));
}

module.exports = setCommandBuild;
