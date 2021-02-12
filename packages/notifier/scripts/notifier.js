const style = require('kleur');

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
   * @param {String} text - Value to log
   * @memberof Notifier
   */
  log(text) {
    console.log(text);
  }

  /**
   * Inform user about something (hopefully interesting)
   * @param {String} text - value to inform about
   * @memberof Notifier
   */
  info(text) {
    const boxen = require('boxen');
    this.log('');
    this.log(boxen(text, {
      padding: {
        top: 0,
        bottom: 0,
        left: 1,
        right: 1,
      },
      dimBorder: true,
      float: 'left',
    }));
    this.log('');
  }

  /**
   * Error event logging
   * @param {String, Object} error
   * @memberof Notifier
   */
  error(error) {
    if (error.messageFormatted) {
      console.error(style.bold().red(error.messageFormatted));
      return;
    }
    console.error(style.bold().red(error));
  }

  /**
   * Write console messages on a single line.
   * @param {String} text
   * @memberof Notifier
   */
  singleLine(text) {
    const single = require('single-line-log').stdout;
    single(text);
  }

  /**
   * Get an emoji by name
   * @param {String} emoji
   * @returns {String}
   * @memberof Notifier
   */
  emoji(emoji) {
    const { get: getEmoji } = require('node-emoji');
    return getEmoji(emoji);
  }

  /**
   * Format a command to log and copy to clipboard for use
   * @param {String} content
   * @returns {String}
   * @memberof Notifier
   */
  script(content) {
    const clipboardy = require('clipboardy');
    clipboardy.writeSync(content);
    return this.style.black().italic().bgYellow(` ${content} `);
  }
}

module.exports = Notifier;
