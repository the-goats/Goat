/**
 * Drupal add attributes function, merge attribute objects
 * @export
 * @param {object, array} attributesOne
 * @param {object, array} attributesTwo
 * @returns {array}
 */
module.exports = function (attributesOne, attributesTwo) {
  const attributes = Object.assign(attributesOne, attributesTwo);
  return Object.keys(attributes).map(attribute => `${attribute}="${Array.isArray(attributes[attribute]) ? attributes[attribute].join(' '): attributes[attribute]}"`).join(' ');
};
