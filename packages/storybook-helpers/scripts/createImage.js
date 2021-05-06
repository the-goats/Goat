const { createAttributes } = require('@the-goat/storybook-helpers');
const image = require('./components/image.twig');

function createImage(attributes) {
  return image({
    attributes: createAttributes(attributes),
  });
}

module.exports = createImage;
