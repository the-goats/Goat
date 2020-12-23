module.exports = {
  id: '/JsBundler',
  type: 'object',
  properties: {
    locations: {
      type: 'object',
      properties: {
        patterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              directory: {
                type: 'string',
              },
              pattern: {
                type: 'string',
              },
            },
            required: ['directory', 'pattern'],
          },
        },
        dist: {
          type: 'string',
        },
      },
      required: ['patterns', 'dist'],
    },
    styles: {
      type: 'object',
      properties: {
        resources: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
    handlers: {
      type: 'object',
      properties: {
        javascript: {
          type: 'boolean',
        },
        styles: {
          type: 'boolean',
        },
        assets: {
          type: 'boolean',
        },
      },
    },
    bundler: {
      type: 'object',
      properties: {
        destination: {
          type: 'object',
          properties: {
            flat: {
              type: 'boolean',
            },
          },
        },
        js: {
          type: 'object',
          properties: {
            output: {
              type: 'object',
              properties: {
                filename: {
                  type: 'string',
                },
                publicpath: {
                },
              },
            },
          },
        },
      },
    },
  },
  required: ['locations', 'bundler', 'styles', 'handlers'],
};
