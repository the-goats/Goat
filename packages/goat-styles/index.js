const compileStyles = require('./scripts/compileStyles');
const schema = require('./scripts/schema');
const path = require('path');
const initConfiguration = require('./init/configuration.json')

/**
 * @function  [getSettings]
 * @returns {object} settings
 */
function getSettings({
  path,
  configuration
}) {
  return {
    source: wrapPath(configuration.locations.styles.src, `${path}/`, '/**/*.s+(a|c)ss', []),
    dest: [`${path}/${configuration.locations.styles.dist}`],
    ignore: ['**/+*', '**/~*'], //Ignore scss files prefixed by ~ and +, these files need to be specifically imported
  };
}

/**
 * @function  [wrapPath]
 * @returns {array} paths
 */
function wrapPath(paths, prefix, suffix = '', extra = []) {
  return [
    ...Array.isArray(paths) ? (paths).map(item => path.normalize(`${prefix}${item}${suffix}`)) : [path.normalize(`${prefix}${paths}${suffix}`)],
    ...extra
  ];
}

module.exports = {
  actions(goat, Goat) {
    const styles = new Goat({
      name: 'Synetic Styles',
      schema,
      method: (config) => {
        const settings = getSettings(config);
        return new Promise((resolve, reject) => {
          resolve(compileStyles(config, settings))
        });
      }
    });
  
    goat
      .command('styles')
      .description('Compile Styles')
      .option('-w, --watch', 'Keep watching the scss files')
      .action(({watch}) => styles.action({ watch }));
    return goat;
  },
  init: {
    configuration: initConfiguration,
  },
}