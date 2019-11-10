/**
 * Drupal BEM function to assist in using BEM formatted classes
 * @export
 * @param {string} base
 * @param {array} modifiers
 * @param {string} element
 * @param {array} extra
 * @returns {object}
 */
module.exports = function(base, modifiers, element, extra) {
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
};
