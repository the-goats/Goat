const Notifier = require('../../methods/notifications/notifyHandler');

/**
 * @description
 * @param {*} file
 * @returns
 */
function cleanFileName(file) {
  return file.replace(`${process.cwd()}/`, '');
}

/**
 * Show event message
 * @param {String} event
 * @param {String} file
 */
function eventMessage(event, file) {
  const eventParts = event.split(':');
  const eventMapping = {
    change: 'changed',
    add: 'added',
    unlink: 'removed',
    addDir: 'addDir',
    unlinkDir: 'unlinkDir',
    lint: 'linted',
    compile: 'compiled',
  };
  Notifier.log(Notifier.style.cyan(Notifier.style.bold(`\nFile ${cleanFileName(file)} has been ${eventMapping[eventParts[1]]}`)));
}

module.exports = eventMessage;
