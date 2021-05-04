import GoatEvents from '../events/goatEvents';

const Notifier = require('@the-goat/notifier');

interface IGoatOption {
  allowOnOnce: boolean;
  allowOnWatch: boolean,
  flags: string;
  label: string;
}

export interface IGoatConfig {
  name: string;
  description: string;
  schema: string;
  method: (config: IGoatConfig) => Promise<void | (() => void)>;
  watch?: () => void;
  init: string;
  options: IGoatOption[];
  command: string;
}

/**
 * Class defining all Goat tasks
 */
class Goat {
  private readonly name: string;

  private readonly key: string;

  private description: string;

  private readonly schema: string;

  private readonly method: (config: IGoatConfig) => Promise<void | (() => void)>;

  private readonly watch?: (goat: Goat) => void;

  private path: string;

  private init: string;

  private configuration = null;

  private events: GoatEvents;

  private readonly options: IGoatOption[];

  private readonly command: string;

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
    // eslint-disable-next-line no-underscore-dangle
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
      .action((config: IGoatConfig) => {
        if (process.env.GOAT_DEBUG) {
          const timeFunction = require('../methods/debug/timeFunction');
          timeFunction(
          // @ts-ignore
            () => this.action({ watch: config.watch }),
            `Executing ${this.key}`,
          );
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
   */
  action(config: IGoatConfig) {
    if (config.watch) {
      const watchFiles = require('../events/watch');
      watchFiles(this.events);
      return this.watchBase(config, this.events);
    }
    return this.actionBase(config);
  }

  /**
   * @description get Goat configuration object of the current project
   */
  getConfiguration() {
    const {
      getConfig,
      validateConfig,
    } = require('../config/config');
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
  actionBase(config: IGoatConfig) {
    this.configuration = this.getConfiguration();
    Notifier.log(
      `${Notifier.emoji('goat')} Running ${this.name
      || 'task'} in ${process.cwd()}\n`,
    );

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
   */
  watchBase(config: IGoatConfig, events: GoatEvents) {
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
   */
  getCommand() {
    return this.command;
  }
}

export default Goat;
