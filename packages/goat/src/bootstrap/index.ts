// @ts-ignore
import Notifier from '@the-goat/notifier';
import GoatEvents from '../events/goatEvents';

interface IGoatOption {
  allowOnOnce?: boolean;
  flags: string;
  label: string;
}

interface IGoatConfig {
  name: string;
  description: string;
  schema: string;
  init: string;
  command: string;
  method: (goat: Goat) => Promise<void>;
  watch?: (goat: Goat) => void;
  options: IGoatOption[];
}

interface IGoatProjectConfig {
  name: string;
  watch: boolean;
}

/**
 * Class defining all Goat tasks
 * @class Goat
 */
export default class Goat {
  private name: string;

  private key: string;

  private description: string;

  private schema: string;

  private path: string;

  private init: string;

  private configuration = null;

  private readonly command: string;

  private readonly method: (goat: Goat) => Promise<void>;

  private readonly watch?: (goat: Goat) => void;

  private events: GoatEvents;

  private options: IGoatOption[];

  constructor(build: IGoatConfig) {
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
    this.command = this.buildCommand();
  }

  /**
   * Build the commander command object
   */
  private buildCommand() {
    const commander = require('commander');
    const command = new commander.Command(this.key)
      .allowUnknownOption(true)
      .command(this.key)
      .description(this.description)
      .action(this.action);
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
   */
  action(config: IGoatProjectConfig) {
    if (config.watch) {
      const watchFiles = require('../events/watch');
      watchFiles(this.events);
      return this.watchBase(config, this.events);
    }
    return this.actionBase(config);
  }

  /**
   * Goat configuration object of the current project
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
   */
  actionBase(config: IGoatProjectConfig) {
    this.configuration = this.getConfiguration();
    Notifier.log(`${Notifier.emoji('goat')} Running ${this.name || 'task'} in ${process.cwd()}\n`);

    // const result = ;
    // result.then((callback) => {
    //   if (typeof callback === 'function') {
    //     callback();
    //   }
    // });
    return this.method({
      ...this,
      options: config,
    });
  }

  /**
   * Base function for watch tasks
   */
  watchBase(config: IGoatProjectConfig, events: GoatEvents) {
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
