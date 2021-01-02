module.exports = {
  id: '/Icons',
  type: 'object',
  properties: {
    locations: {
      type: 'object',
      properties: {
        icons: {
          type: 'object',
          properties: {
            src: {
              type: 'string',
              default: 'svg/',
            },
            dist: {
              type: 'string',
              default: 'icons/',
            },
          },
          required: ['src', 'dist'],
        },
      },
      required: ['icons'],
    },
    icons: {
      type: 'object',
      properties: {
        fontName: {
          type: 'string',
          default: 'icons',
        },
        prefix: {
          type: 'string',
          default: 'icon',
        },
        fontDirectory: {
          type: 'string',
          default: 'fonts',
        },
        generate: {
          type: 'object',
          properties: {
            woff: {
              type: 'boolean',
              default: true,
            },
            eot: {
              type: 'boolean',
              default: false,
            },
            ttf: {
              type: 'boolean',
              default: false,
            },
            woff2: {
              type: 'boolean',
              default: true,
            },
            preview: {
              type: 'boolean',
              default: true,
            },
            json: {
              type: 'boolean',
              default: true,
            },
            variables: {
              type: 'boolean',
              default: true,
            },
            css: {
              type: 'boolean',
              default: false,
            },
            styles: {
              type: 'boolean',
              default: true,
            },
            selection: {
              type: 'boolean',
              default: true,
            },
            svg: {
              type: 'boolean',
              default: true,
            },
            symbol: {
              type: 'boolean',
              default: true,
            },
          },
        },
      },
    },
  },
  required: ['locations'],
};
