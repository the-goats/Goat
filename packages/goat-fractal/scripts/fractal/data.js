const { get } = require('lodash');
const { normalize } = require('path');

/**
 * Set project meta data in fractal
 * @param {object} configuration
 * @param {object} styleguide
 * @returns {object}
 */
const fractalSetMeta = (configuration, styleguide) => {
  styleguide.set('project.title', configuration.name);
  if (configuration.author) {
    styleguide.set('project.author', get(configuration, 'author') || 'Goat');
  }
  return styleguide;
}

/**
 * Configure Fractal paths
 * @param {object} configuration
 * @param {string} currentPath
 * @param {object} styleguide
 * @returns {object}
 */
const fractalSetPaths = (configuration, currentPath, styleguide) => {
  styleguide.components.set('path', normalize(`${currentPath}/components`));
  styleguide.docs.set('path', normalize(`${currentPath}/docs`));
  styleguide.web.set('static.path', normalize(`${currentPath}/.goat/temp/fractal/assets/`));
  styleguide.web.set('builder.dest', normalize(`${currentPath}/.goat/temp/fractal/styleguide`));
  return styleguide;
}

module.exports = { fractalSetMeta, fractalSetPaths };
