const {
  normalize
} = require('path');
const fractal = require('@frctl/fractal').create();
const mandelbrot = require('@frctl/mandelbrot');
const twigAdapter = require('@wondrousllc/fractal-twig-drupal-adapter');
const { get } = require('lodash');

module.exports = ({
  path,
  configuration,
  Notifier,
}) => {

  fractal.components.engine(twigAdapter({
    handlePrefix: '@components/'
  }));
  fractal.components.set('ext', '.twig');

  const theme = mandelbrot({
    skin: get(configuration, 'configuration.fractal.theme.skin') || "navy",
    panels: get(configuration, 'configuration.fractal.theme.panels') || ["info", "html", "view", "context", "resources", "notes"],
    styles: ['default', `/${path}/styleguide/theme/overrides.css`]
  });

  fractal.web.theme(theme);


  /* Set the title of the project */
  fractal.set('project.title', configuration.name);
  if (configuration.author) {
    fractal.set('project.author', configuration.author);
  }

  /* Tell Fractal where the components will live */
  fractal.components.set('path', normalize(`${path}/components`));
  /* Tell Fractal where the documentation pages will live */
  fractal.docs.set('path', normalize(`${path}/docs`));
  /* Specify a directory of static assets */
  fractal.web.set('static.path', normalize(`${path}/`));
  /* Set the static HTML build destination */
  fractal.web.set('builder.dest', normalize(`${path}/.goat/temp/fractal/styleguide`));
  console.log('hi');


  const builder = fractal.web.builder();
  const logger = fractal.cli.console;
  builder.on('progress', (completed, total) => Notifier.singleLine(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', err => console.error(err.message));
  builder.build().then(() => {
    console.log('Fractal build completed!');

    const server = fractal.web.server({
      sync: true
    });
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
      logger.success(`Fractal server is now running at ${server.url}`);
    });

  });
}