module.exports = {
  id: '/JsBundler',
  type: 'object',
  properties: {
    browserSupport: {
      type: 'array',
      default: ['> 1%', 'last 2 versions'],
    },
    locations: {
      type: 'object',
      properties: {
        javascript: {
          type: 'object',
          properties: {
            src: {
              type: 'array',
              items: {
                type: 'string',
              },
              default: [
                'components',
              ],
            },
            dist: {
              type: 'string',
              default: 'dist',
            },
          },
          required: ['src', 'dist'],
        },
      },
      required: ['javascript'],
    },
    bundler: {
      type: 'object',
      properties: {
        js: {
          type: 'object',
          properties: {
            output: {
              type: 'object',
              properties: {
                filename: {
                  type: 'string',
                  default: '[name].bundle.js',
                },
                publicpath: {
                  default: false,
                },
              },
            },
          },
        },
      },
    },
  },
};
