import Notifier from '@the-goat/notifier';

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
  const fileName = cleanFileName(file);
  const eventMapping = {
    change: 'changed',
    add: 'added',
    unlink: 'removed',
    addDir: 'added',
    unlinkDir: 'unlinkDir',
    lint: 'linted',
    compile: 'compiled',
  };
  const eventType = eventParts[1];
  const type = eventType.includes('Dir') ? 'Directory' : 'File';
  Notifier.log(Notifier.style.cyan(Notifier.style.bold(`\n${type} ${fileName} has been ${eventMapping[eventType]}`)));
}

module.exports = eventMessage;
