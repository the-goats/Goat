const { readFileSync } = require('fs');
const { join } = require('path');

module.exports = {
  files: [
    {
      name: 'baseStyling.css',
      destination: '.goat/styleguide/',
      data: readFileSync(join(__dirname, './files/baseStyling.css'), 'utf8'),
    },
    {
      name: 'imports.twig',
      destination: '.goat/styleguide/',
      data: readFileSync(join(__dirname, './files/imports.twig'), 'utf8'),
    },
    {
      name: 'fractalOverrides.css',
      destination: '.goat/styleguide/',
      data: readFileSync(join(__dirname, './files/fractalOverrides.css'), 'utf8'),
    },
    {
      name: 'swatch.twig',
      destination: '.goat/styleguide/goatComponents',
      data: readFileSync(join(__dirname, './files/swatch.twig'), 'utf8'),
    },
  ],
};
