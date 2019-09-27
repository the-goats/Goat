const {
  normalize
} = require('path');
const fractal = require('@frctl/fractal');
const mandelbrot = require('@frctl/mandelbrot');
const twigAdapter = require('@goat-cli/fractal-twig-adapter');
const { get } = require('lodash');
const fs = require('fs');


const createSymlink = (source, destination) => {
  return fs.promises.symlink(source, destination);
}

const checkSymLinkExists = (source) => {
  return new Promise(async (resolve) => {
    try {
      resolve(await fs.promises.readlink(source));
    } catch {
      resolve(false);
    }
  })
}

const fractalAddEngine = (styleguide) => {
  styleguide.components.engine(twigAdapter({
    nameSpaces: {
      'atoms': '02-atoms',
      'molecules': '03-molecules',
    },
    handlePrefix: '@',
    filters: {
      render(str) {
        return str;
      },
      without(str) {
        return str;
      }
    },
    functions : {
      bem(base, modifiers, element, extra) {
        const classes = [];
        if (extra) {
          classes.push(extra);
        } 
        const className = element !== undefined ? `${base}__${element}` : base;
        classes.push(className);
        if (!modifiers) {
          return { class: classes.flat() };
        }
        modifiers.forEach(modifier => classes.push(`${className}--${modifier}`))
        return { class: classes.flat() };
      },
      add_attributes(attributesOne, attributesTwo) {
        const attributes = Object.assign(attributesOne, attributesTwo);
        return Object.keys(attributes).map(attribute => `${attribute}="${Array.isArray(attributes[attribute]) ? attributes[attribute].join(' '): attributes[attribute]}"`).join(' ');
      }
    },
  }));
  styleguide.components.set('ext', '.twig');
  return styleguide;
}

const fractalAddTheme = (configuration, currentPath, styleguide) => {
  const theme = mandelbrot({
    skin: get(configuration, 'configuration.fractal.theme.skin') || "navy",
    panels: get(configuration, 'configuration.fractal.theme.panels') || ["info", "html", "view", "context", "resources", "notes"],
    styles: ['default', normalize(`/${currentPath}/styleguide/theme/overrides.css`)]
  });

  styleguide.web.theme(theme);
  return styleguide;
}

const fractalSetMeta = (configuration, styleguide) => {
  styleguide.set('project.title', configuration.name);
  if (configuration.author) {
    styleguide.set('project.author', configuration.author);
  }
  return styleguide;
}

const fractalSetPaths = (configuration, currentPath, styleguide) => {
  /* Tell Fractal where the components will live */
  styleguide.components.set('path', normalize(`${currentPath}/components`));
  /* Tell Fractal where the documentation pages will live */
  styleguide.docs.set('path', normalize(`${currentPath}/docs`));
  /* Specify a directory of static assets */
  styleguide.web.set('static.path', normalize(`${currentPath}/.goat/temp/fractal/assets/`));
  /* Set the static HTML build destination */
  styleguide.web.set('builder.dest', normalize(`${currentPath}/.goat/temp/fractal/styleguide`));
  return styleguide;
}

const fractalBuilder = (Notifier, styleguide) => {
  const builder = styleguide.web.builder();
  builder.on('progress', (completed, total) => Notifier.singleLine(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', err => Notifier.error(err.message));
  return builder.build()
}

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

  styleguide = fractalAddEngine(styleguide);
  styleguide = fractalAddTheme(configuration, currentPath, styleguide);
  styleguide = fractalSetMeta(configuration, styleguide);
  styleguide = fractalSetPaths(configuration, currentPath, styleguide);

  const build = fractalBuilder(Notifier, styleguide);

  build.then(() => {
    Notifier.log('Fractal build completed!');
    const server = styleguide.web.server({
      sync: true
    });
    server.on('error', err => Notifier.error(err.message));
    return server.start().then(() => {
      Notifier.log(Notifier.style.green(`Fractal server is now running at ${server.url}`));
    });

  });

}