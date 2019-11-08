const chokidar = require('chokidar');

/**
 * Base for file watch event, watches the cwd and triggers a goat event on file changes
 * @param {Object} events
 */
function watch(events) {
  chokidar.watch('./**/*', {
    persistent: true,
    ignoreInitial: true,
  })
    .on('all', (event, path) => {
      events.emit({
        event: `file:${event}`,
        path,
        properties: {},
      });
    });
}

module.exports = watch;
