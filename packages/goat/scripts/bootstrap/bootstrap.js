const getConfig = require('../config/config');
const checkSchema = require('../validators/schema');
const Notifier = require('../notifier');

/**
 * Class defining all Goat tasks
 * @class Goat
 */
class Goat {
  constructor(build) {
    this.name = build.name;
    this.schema = build.schema;
    this.method = build.method;
    this.path = process.cwd();
    this.Notifier =  new Notifier();
    this.configuration;
  }

  /**
   * Method to be executed by running Goat command.
   * @param {Object} options
   * @memberof Goat
   */
  action(options) {
    this.actionBase(options);
  }

  /**
   * @description
   * @returns {Object} configuration - Goat configuration object of the current project
   * @memberof Goat
   */
  getConfiguration() {
    return getConfig();
  }

  /**
   * Forms the base of all Goat actions,
   * @param {Object} options
   * @returns
   * @memberof Goat
   */
  actionBase(options) {
    this.configuration = this.getConfiguration();
    const hrstart = process.hrtime();
    this.Notifier.icon(`Running ${this.name || 'task'} in ${process.cwd()}\n`, 'goat')

    // Validate used config
    if (this.schema && !checkSchema(this.configuration, this.schema)) {
      return null;
    }

    const result = this.method({
      ...this,
      options,
    });
    result.then((callback) => {
      if (typeof callback === 'function') {
        callback()
      };
      const hrend = process.hrtime(hrstart)
      this.Notifier.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
    })
  }
  
}

module.exports = Goat;