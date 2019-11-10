const { get } = require('lodash');

/**
 * Build an fractal instance
 * @param {object} configuration
 * @param {object} Notifier
 * @param {object} styleguide
 * @returns {*}
 */
const fractalBuilder = (configuration, Notifier, styleguide) => {
  const builder = styleguide.web.builder();
  styleguide.web.set('builder.concurrency', get(configuration, 'styleguide.server.concurrency') || 10);
  styleguide.web.set('server.sync', get(configuration, 'styleguide.server.sync') || false);
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
