const Notifier = require('../methods/notifications/notifyHandler');

/**
 * Validate the config object against the provided schema
 * @param {Object} config
 * @param {Object} schema
 * @returns {Boolean} isValid
 */
function checkSchema(config, schema) {
  const { validate } = require('jsonschema');
  const result = validate(config, schema);
  if (result.errors.length === 0) {
    return true;
  }
  result.errors.forEach((error) => {
    Notifier.error(`${error.property.replace('instance.', '')} ${error.message}`);
  });
  return false;
}

module.exports = checkSchema;
