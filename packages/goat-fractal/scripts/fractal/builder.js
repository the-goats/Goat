/**
 * Build an fractal instance
 * @param {object} Notifier
 * @param {object} styleguide
 * @returns {*}
 */
const fractalBuilder = (Notifier, styleguide) => {
  const builder = styleguide.web.builder();
  styleguide.web.set('builder.concurrency', 10);
  styleguide.web.set('server.sync', true);
  builder.on('progress', (completed, total) => {
    Notifier.singleLine(`Exported ${completed} of ${total} items`, 'info');
    if (completed === total) {
      Notifier.log('');
    }
  });
  builder.on('error', err => Notifier.error(err.message));
  return builder.build()
}

module.exports = { fractalBuilder };
