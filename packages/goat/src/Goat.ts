// @ts-ignore
import Notifier from '@the-goat/notifier';
import commander, { Command } from 'commander';
import { JSONSchema6 } from 'json-schema';
import GoatEvents from './events/GoatEvents';
import writeConfig from './schemas/writeConfig';
import { getConfig, validateConfig } from './config/config';
import checkSchema from './validators/schema';
import { IGoatExternalProjectConfig } from './config';
import watchFiles from './events/watch';

interface IGoatOption {
  allowOnOnce?: boolean;
  allowOnWatch?: boolean;
  flags: string;
  label: string;
}

export type TGoatMethodConfig = Goat & { options: Command };

interface IGoatConfig {
  name: string;
  description: string;
  schema: JSONSchema6;
  init?: {
    files?: () => void;
  };
  command: string;
  method: (command: TGoatMethodConfig) => Promise<void>;
  watch?: (command: TGoatMethodConfig) => void;
  options?: IGoatOption[];
}

/**
 * Class defining all Goat tasks
 */
export default class Goat {
  public name: string;

  private key: string;

  private description: string;

  private schema: JSONSchema6;

  public path: string;

  private init?: {
    files?: () => void;
  };

  public configuration: IGoatExternalProjectConfig;

  private readonly command: Command;

  public readonly method: (command: TGoatMethodConfig) => Promise<void>;

  public readonly watch?: (command: TGoatMethodConfig) => void;

  public events: GoatEvents;

  public options: IGoatOption[];

  constructor(build: IGoatConfig) {
    this.name = build.name;
    this.key = build.command;
    this.description = build.description;
    this.schema = build.schema;
    this.method = build.method;
    this.watch = build.watch;
    this.path = process.cwd();
    this.init = build.init;
    this.events = new GoatEvents();
    this.options = build.options || [];
    this.configuration = this.getConfiguration();
    this.command = this.buildCommand();
  }

  /**
   * Build the commander command object
   */
  private buildCommand():Command {
    const command = new commander.Command(this.key)
      .allowUnknownOption(true)
      .command(this.key)
      .description(this.description)
      // DO NOT SIMPLIFY: this-binding required
      .action((config: any) => this.action(config));
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
    return command as Command;
  }

  /**
   * Method to be executed by running Goat command.
   */
  action(config: any) {
    if (config.watch) {
      watchFiles(this.events);
      return this.watchBase(config, this.events);
    }
    return this.actionBase(config);
  }

  /**
   * Goat configuration object of the current project
   */
  private getConfiguration(): IGoatExternalProjectConfig {
    const configuration = getConfig();
    if (!configuration) {
      throw new Error('Missing Goat configuraton');
    }
    const isValid = validateConfig(configuration);
    // Validate used config
    if (!isValid || (this.schema && !checkSchema(configuration, this.schema))) {
      Notifier.error('The configuration is not correct');
      writeConfig(this.schema);
    }
    return configuration;
  }

  /**
   * Forms the base of all Goat actions,
   */
  public actionBase(config: Command): Promise<void> {
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
  watchBase(config: Command, events: GoatEvents) {
    this.events = events;
    if (!this.watch) {
      Notifier.log('This command has no watch option');
      return;
    }
    this.watch({
      ...this,
      options: config,
    });
  }

  /**
   * Build command
   */
  getCommand() {
    return this.command;
  }
}
