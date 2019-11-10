module.exports = {
  id: '/ESlint',
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
            }
          },
          required: ['src']
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