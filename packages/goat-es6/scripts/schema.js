module.exports = {
  id: '/SyneticJs',
  type: 'object',
  properties: {
    browserSupport: {
      type: 'array'
    },
    locations: {
      type: 'object',
      properties: {
        javascript: {
          type: 'object',
          properties: {
            src: {
              type: 'array'
            },
            libraries: {
              type: 'string'
            },
          },
          required: ['src', 'libraries']
        }
      },
      required: ['javascript']
    },
  },
  js: {
    type: 'object',
    properties: {
      eslint: {
        type: 'object',
        properties: {
          es6: {
            type: 'boolean'
          },
          config: {
            type: 'object'
          }
        }
      }
    }
  }
}