module.exports = {
  id: '/SyneticStyles',
  type: 'object',
  properties: {
    browserSupport: {
      type: 'array',
    },
    locations: {
      type: 'object',
      properties: {
        node_modules: {
          type: 'string',
        },
        styles: {
          type: 'object',
          properties: {
            src: {
              type: 'string',
            },
            dist: {
              type: 'string',
            },
          },
          required: ['src', 'dist'],
        },
      },
      required: ['styles'],
    },
  },
  styles: {
    type: 'object',
    properties: {
      minify: {
        type: 'boolean',
      },
      compass: {
        type: 'boolean',
      },
      exclude: {
        type: 'array',
      },
      sourceMaps: {
        type: 'object',
        properties: {
          generate: {
            type: 'boolean',
          },
          location: {
            type: 'string',
          },
          loadMaps: {
            type: 'boolean',
          },
          identityMap: {
            type: 'boolean',
          },
          debug: {
            type: 'boolean',
          },
          addComment: {
            type: 'boolean',
          },
          includeContent: {
            type: 'boolean',
          },
          charset: {
            type: 'string',
          },
          destPath: {
            type: 'string',
          },
          sourceMappingUrlPrefix: {
            type: 'string',
          },
        },
      },
      pxToRem: {
        type: 'object',
        properties: {
          enabled: {
            type: 'boolean',
          },
          settings: {
            type: 'object',
            properties: {
              rootValue: {
                type: 'number',
              },
              replace: {
                type: 'boolean',
              },
            },
          },
        },
      },
    },
  },
};
