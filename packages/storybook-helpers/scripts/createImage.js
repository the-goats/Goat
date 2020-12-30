const { createAttributes } = require('../index');
const image = require('./components/image.twig');

function createImage(attributes) {
  return image({
    attributes: createAttributes(attributes),
  });
}

module.exports = createImage;
