const { normalize } = require('path');
const fractal = require('@frctl/fractal');
const { createSymlink, checkSymLinkExists } = require('./symlinks');
const { fractalAddEngine } = require('./fractal/engine');
const { fractalAddTheme } = require('./fractal/theme');
const { fractalSetMeta, fractalSetPaths } = require('./fractal/data');
const { fractalBuilder } = require('./fractal/builder');

module.exports = async ({
  path,
  configuration,
  Notifier,
}) => {
  const currentPath = normalize(`${path}`);
  const styleGuideAssetsPath = normalize(`${path}/.goat/temp/fractal/assets`);

  if (await checkSymLinkExists(styleGuideAssetsPath) !== currentPath) {
    createSymlink(currentPath, styleGuideAssetsPath);
    Notifier.log('Symlink created');
  }

  let styleguide = fractal.create();

  styleguide = fractalAddEngine(configuration, styleguide);
  styleguide = fractalAddTheme(configuration, currentPath, styleguide);
  styleguide = fractalSetMeta(configuration, styleguide);
  styleguide = fractalSetPaths(configuration, currentPath, styleguide);

  const build = fractalBuilder(configuration, Notifier, styleguide);

  build.then(() => {
    Notifier.log('Fractal build completed!');
    const server = styleguide.web.server({
      sync: true,
    });
    server.on('error', err => Notifier.error(err.message));
    return server.start().then(() => {
      Notifier.log(Notifier.style.green(`Fractal server is now running at ${server.url}`));
    });
  });
};
