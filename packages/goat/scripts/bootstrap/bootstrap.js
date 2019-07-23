const getConfig = require('../config/config');
const checkSchema = require('../validators/schema');
const Notifier = require('../notifier');
const chokidar = require('chokidar');

/**
 * Class defining all Goat tasks
 * @class Goat
 */
class Goat {
  constructor(build) {
    this.name = build.name;
    this.schema = build.schema;
    this.method = build.method;
    this.watch = build.watch;
    this.path = process.cwd();
    this.Notifier = new Notifier();
    this.configuration;
  }

  /**
   * Method to be executed by running Goat command.
   * @param {Object} options
   * @memberof Goat
   */
  action(options) {
    this.configuration = this.getConfiguration();
    if (options.watch) {
      return this.watchBase();
    }
    this.actionBase(options);
  }

  watch(source) {

  }

  /**
   * @description
   * @returns {Object} configuration - Goat configuration object of the current project
   * @memberof Goat
   */
  getConfiguration() {
    const configuration = getConfig();
    // Validate used config
    if (this.schema && !checkSchema(this.configuration, this.schema)) {
      // return null;
      throw 'The configuration is not correct';
    }
    return configuration
  }

  /**
   * Forms the base of all Goat actions,
   * @param {Object} options
   * @returns
   * @memberof Goat
   */
  actionBase(options) {
    this.Notifier.log('\u1F410', `Running ${this.name || 'task'} in ${process.cwd()}\n`);

    const result = this.method({
      ...this,
      options,
    });
    if (result instanceof Promise) {
      result.then((callback) => {
        if (typeof callback === 'function') {
          callback()
        };
      })
    }
  }

  watchBase() {
    this.Notifier.log(`Watching ${this.name || 'task'} in ${process.cwd()}\n`);
    const result = this.watch({
      ...this,
      watch: (source) => {
        return chokidar.watch(source, {
          persistent: true,
          ignoreInitial: true,
        })
      },
    });
  }
}

module.exports = Goat;