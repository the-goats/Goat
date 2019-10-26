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
    this.command = build.command;
    this.description = build.description;
    this.schema = build.schema;
    this.method = build.method;
    this.watch = build.watch;
    this.path = process.cwd();
    this.init = build.init;
    this.Notifier = new Notifier();
    this.configuration;
  }
 
  /**
   * Method to be executed by running Goat command.
   * @param {Object} options
   * @memberof Goat
   */
  action(options) {
    if (options.watch) {
      const { watch, goatEvents } = require('./watch');
      const events = new goatEvents();
      watch(events);
      return this.watchBase(events);
    }
    this.actionBase(options);
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
    this.configuration = this.getConfiguration();
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

  /**
   * Base function for watch tasks
   * @memberof Goat
   */
  watchBase(events) {
    this.configuration = this.getConfiguration();
    if (!this.watch) {
      this.Notifier.log('This command has no watch option');
      return;
    }
    this.Notifier.log(`Watching ${this.name || 'task'} in ${process.cwd()}`);
    this.watch({
      ...this,
      events,
    });
  }

  /**
   * Build command
   * @param {object} goat
   * @returns {object} goat
   * @memberof Goat
   */
  getCommand(goat) {
    goat
      .command(this.command)
      .description(this.description)
      .option(this.watch ? '-w, --watch' : '', this.watch ? 'Watch for file changes' : '')
      .action(({watch}) => this.action({ watch }));
    return goat;
  }
}

module.exports = Goat;