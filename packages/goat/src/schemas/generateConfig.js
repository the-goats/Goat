export default function generateConfig(schema) {
  const defaults = require('json-schema-defaults');
  return defaults(schema);
}
