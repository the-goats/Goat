const Notifier = require('@the-goat/notifier');
const GoatEvents = require('../events/goatEvents');

/**
 * Class defining all Goat tasks
 * @class Goat
 */
class Goat {
  constructor(build) {
    this.name = build.name;
    this.key = build.command;
    this.description = build.description;
    this.schema = build.schema;
    this.method = build.method;
    this.watch = build.watch;
    this.path = process.cwd();
    this.init = build.init;
    this.configuration = null;
    this.events = new GoatEvents();
    this.options = build.options;
    // eslint-disable-next-line no-underscore-dangle
    this.command = this._buildCommand();
  }

  /**
   * Build the commander command object
   * @returns {Function} Command
   * @memberof Goat
   */
  // eslint-disable-next-line no-underscore-dangle
  _buildCommand() {
    const commander = require('commander');
    const command = new commander.Command(this.key)
      .allowUnknownOption(true)
      .command(this.key)
      .description(this.description)
      .action((config) => {
        if (global.DEBUG) {
          const timeFunction = require('../methods/debug/timeFunction');
          timeFunction(() => this.action({ watch: config.watch }), `Executing ${this.key}`);
          return;
        }
        this.action(config);
      });
    if (this.watch) {
      command.option('-w, --watch', 'Watch for file changes');
    }
    if (this.options) {
      this.options.forEach((option) => {
        if (!option.allowOnOnce) {
          return;
        }
        command.option(option.flags, option.label);
      });
    }
    return command;
  }

  /**
   * Method to be executed by running Goat command.
   * @param {Object} config
   * @memberof Goat
   */
  action(config) {
    if (config.watch) {
      const watchFiles = require('../events/watch');
      watchFiles(this.events);
      return this.watchBase(config, this.events);
    }
    return this.actionBase(config);
  }

  /**
   * @description
   * @returns {Object} configuration - Goat configuration object of the current project
   * @memberof Goat
   */
  getConfiguration() {
    const { getConfig, validateConfig } = require('../config/config');
    const checkSchema = require('../validators/schema');
    const configuration = getConfig();
    const isValid = validateConfig(configuration);
    // Validate used config
    if (!isValid || (this.schema && !checkSchema(configuration, this.schema))) {
      Notifier.error('The configuration is not correct');
      const { updateConfig } = require('../schemas/writeConfig');
      updateConfig(this.schema);
    }
    return configuration;
  }

  /**
   * Forms the base of all Goat actions,
   * @param {Object} config
   * @returns
   * @memberof Goat
   */
  actionBase(config) {
    this.configuration = this.getConfiguration();
    Notifier.log(`${Notifier.emoji('goat')} Running ${this.name || 'task'} in ${process.cwd()}\n`);

    const result = this.method({
      ...this,
      options: config,
    });
    if (result instanceof Promise) {
      result.then((callback) => {
        if (typeof callback === 'function') {
          callback();
        }
      });
    }
    return result;
  }

  /**
   * Base function for watch tasks
   * @param {Object} config
   * @param {Object} events
   * @memberof Goat
   */
  watchBase(config, events) {
    this.events = events;
    this.configuration = this.getConfiguration();
    if (!this.watch) {
      Notifier.log('This command has no watch option');
      return;
    }
    this.watch({
      ...this,
      options: config,
      events,
    });
  }

  /**
   * Build command
   * @returns {function} command
   * @memberof Goat
   */
  getCommand() {
    return this.command;
  }
}

module.exports = Goat;
