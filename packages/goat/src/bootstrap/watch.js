 const chokidar = require('chokidar');
const { EventEmitter } = require('events');
const miniMatch = require('minimatch');
const Notify = require('../notifier');
const Notifier = new Notify()

function match(file, pattern) {
  if (!Array.isArray(pattern)) {
    return miniMatch(file, pattern)
  }
  return pattern.filter(item => miniMatch(file, item)).length > 0;
}

function getFileType(path) {
  return path.substring(path.lastIndexOf('.') + 1);
}

class goatEvents extends EventEmitter {
  emit(args) {
    const parameters = {
      ...args
    };
    if (args.path) {
      parameters.extension = getFileType(args.path);
    }
    Notifier.log(Notifier.style.bold(`\nFile ${args.path} has been changed`));
    super.emit('goat', parameters);
  }

  watch(callback, parameters = {}) {
    super.on('goat', (data) => {
      if (parameters.pattern && !match(data.path, parameters.pattern)) {
        return;
      }
      Notifier.log(`\tRunning ${parameters.name || 'unnamed task' }`);
      callback(data);
    });
  }

  get on() { return undefined }
}

function watch(events) {
  chokidar.watch('./**/*', {
    persistent: true,
    ignoreInitial: true,
  })
  .on('all', (event, path) => {
    events.emit({ 
      event,
      path,
      properties: {}, 
    })
  });
};

module.exports = { watch, goatEvents };