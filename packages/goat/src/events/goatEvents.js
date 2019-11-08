const { EventEmitter } = require('events');
const { parse } = require('path');
const matchPattern = require('./modules/matchPattern');
const matchEvent = require('./modules/matchEvent');
const eventMessage = require('./modules/eventMessage');
const Notify = require('../notifier/notifier');

const Notifier = new Notify();

/**
 * Execute callback event based on event data
 * @param {Function} callback
 * @param {Object} data
 * @returns
 */
function handleEvent(callback, data) {
  if (!data.event || (callback.pattern && !matchPattern(data.path, callback.pattern)) || !matchEvent(data.event, callback.events)) {
    return;
  }
  Notifier.log(Notifier.style.cyan(`\tRunning ${callback.name || 'unnamed task'}`));
  callback.method(data);
}

/**
 * Custom event handler for goat packages
 * @class goatEvents
 * @extends {EventEmitter}
 */
class goatEvents extends EventEmitter {
  emit(args) {
    const parameters = {
      ...args,
    };
    if (args.path) {
      parameters.extension = parse(args.path).ext;
    }
    if (!parameters.silent) {
      eventMessage(args.event, args.path);
    }
    super.emit('goat', parameters);
  }

  watch(callback = {}) {
    super.on('goat', (data) => {
      if (!Array.isArray(callback)) {
        handleEvent(callback, data);
        return;
      }
      callback.forEach((item) => {
        handleEvent(item, data);
      });
    });
  }

  // eslint-disable-next-line
  get on() { return undefined; }
}

module.exports = goatEvents;
