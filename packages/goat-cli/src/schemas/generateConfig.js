module.exports = function generateConfig(schema) {
  const defaults = require('json-schema-defaults');
  return defaults(schema);
};
