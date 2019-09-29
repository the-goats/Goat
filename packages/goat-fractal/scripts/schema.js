module.exports = {
  id: '/SyneticFractal',
  type: 'object',
  properties: {
    author: {
      type: 'string'
    },
    nameSpaces: {
      type: 'object'
    },
    styleguide: {
      type: 'object',
      properties: {
        skin: {
          type: 'string'
        },
        panels: {
          type: 'array'
        },
        server: {
          type: 'object',
          properties: {
            concurrency: {
              type: 'number'
            },
            sync: {
              type: 'boolean',
            }
          }
        }
      }
    }
  }
}