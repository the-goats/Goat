const style = require('kleur');
const emoji = require('node-emoji');

/**
 * Goat's Notification services
 * @class Notifier
 */
class Notifier {
  constructor() {
    this.style = style;
  }

  /**
   * Basic logging functionality
   * @param {*} text - Value to log
   * @memberof Notifier
   */
  log(text) {
    console.log(text);    
  }

  /**
   * Inform user about something (hopefully interesting)
   * @param {*} text - value to inform about
   * @memberof Notifier
   */
  info(text) {
    console.info(text);    
  }

  /**
   * Error event logging
   * @param {String, Object} error
   * @memberof Notifier
   */
  error(error) {
    if (error.messageFormatted) {
      console.error(this.style.bold().red(error.messageFormatted));
      return
    }
    console.error(this.style.bold().red(error));
  }

  /**
   * @description
   * @param {String} text
   * @param {String} icon
   * @memberof Notifier
   */
  icon(text, icon) {
    if (typeof text !== 'string') {
      text = text.toString();
    }
    this.log(`${emoji.get(icon)} ${text}`);
  }
}

module.exports = Notifier;