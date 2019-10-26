const mandelbrot = require('@frctl/mandelbrot');
const { get } = require('lodash');
const { normalize } = require('path');

/**
 * Configure the fractal theme
 * @param {object} configuration
 * @param {string} currentPath
 * @param {object} styleguide
 * @returns {object}
 */
const fractalAddTheme = (configuration, currentPath, styleguide) => {
  const theme = mandelbrot({
    skin: get(configuration, 'styleguide.skin') || "navy",
    panels: get(configuration, 'styleguide.panels') || ["info", "html", "view", "context", "resources", "notes"],
    styles: ['default', normalize(`/${currentPath}/styleguide/theme/overrides.css`)]
  });

  styleguide.web.theme(theme);
  return styleguide;
}

module.exports = { fractalAddTheme };
