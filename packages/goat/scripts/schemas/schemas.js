module.exports = {
  id: '/Base',
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    functions: {
      type: 'array'
    },
    version: {
      $type: 'string'
    },
  },
  required: ['functions', 'version']
};