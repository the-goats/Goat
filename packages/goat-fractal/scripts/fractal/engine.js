const { get } = require('lodash');
const twigAdapter = require('@goat-cli/fractal-twig-adapter');
const render = require('../twig/filters/render');
const without = require('../twig/filters/render');
const bem = require('../twig/functions/bem');
const add_attributes = require('../twig/functions/add_attributes');

/**
 * Add templating engine to Fractal
 * @param {object} configuration
 * @param {object} styleguide
 * @returns {object}
 */
const fractalAddEngine = (configuration, styleguide) => {
  styleguide.components.engine(twigAdapter({
    nameSpaces:  get(configuration, 'nameSpaces') || {
      base: '01-base',
      atoms: '02-atoms',
      molecules: '03-molecules',
      organisms: '04-organisms',
    },
    handlePrefix: '@',
    filters: {
      render,
      without,
    },
    functions : {
      bem,
      add_attributes,
    },
  }));
  styleguide.components.set('ext', '.twig');
  return styleguide;
}

module.exports = { fractalAddEngine };
