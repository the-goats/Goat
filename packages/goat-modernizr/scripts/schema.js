module.exports = {
  id: '/SyneticJs',
  type: 'object',
  properties: {
    locations: {
      type: 'object',
      properties: {
        styles: {
          type: 'object',
          properties: {
            src: {
              type: 'string'
            },
            dist: {
              type: 'string'
            },
          },
          required: ['src']
        },
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
      required: ['javascript', 'styles']
    },
  },
  js: {
    type: 'object',
    properties: {
      minify: {
        type: 'boolean'
      },
      modernizr: {
        type: 'object',
        properties: {
          include: {
            type: 'array' 
          },
          exclude: {
            type: 'array'
          },
        },
      },
    },
    required: ['modernizr']
  }
}