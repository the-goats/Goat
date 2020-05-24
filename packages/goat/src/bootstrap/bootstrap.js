const Notifier = require('../methods/notifications/notifier');
const GoatEvents = require('../events/goatEvents');

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
    this.configuration = null;
    this.events = new GoatEvents();
  }

  /**
   * Method to be executed by running Goat command.
   * @param {Object} options
   * @memberof Goat
   */
  action(options) {
    if (options.watch) {
      const watchFiles = require('../events/watch');
      watchFiles(this.events);
      return this.watchBase(this.events);
    }
    return this.actionBase(options);
  }

  /**
   * @description
   * @returns {Object} configuration - Goat configuration object of the current project
   * @memberof Goat
   */
  getConfiguration() {
    const getConfig = require('../config/config');
    const checkSchema = require('../validators/schema');
    const configuration = getConfig();
    // Validate used config
    if (this.schema && !checkSchema(configuration, this.schema)) {
      throw new Error('The configuration is not correct');
    }
    return configuration;
  }

  /**
   * Forms the base of all Goat actions,
   * @param {Object} options
   * @returns
   * @memberof Goat
   */
  actionBase(options) {
    this.configuration = this.getConfiguration();
    this.Notifier.log(`${this.Notifier.emoji('goat')} Running ${this.name || 'task'} in ${process.cwd()}\n`);

    const result = this.method({
      ...this,
      options,
    });
    if (result instanceof Promise) {
      result.then((callback) => {
        if (typeof callback === 'function') {
          callback();
        }
      });
    }
  }

  /**
   * Base function for watch tasks
   * @memberof Goat
   */
  watchBase(events) {
    this.events = events;
    this.configuration = this.getConfiguration();
    if (!this.watch) {
      this.Notifier.log('This command has no watch option');
      return;
    }
    this.watch({
      ...this,
    });
  }

  /**
   * Build command
   * @returns {function} command
   * @memberof Goat
   */
  getCommand() {
    const commander = require('commander');
    return new commander.Command(this.command)
      .command(this.command)
      .description(this.description)
      .option(this.watch ? '-w, --watch' : '', this.watch ? 'Watch for file changes' : '')
      .action(({ watch }) => this.action({ watch }));
  }
}

module.exports = Goat;
