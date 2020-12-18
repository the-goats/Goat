module.exports = {
  id: '/JsBundler',
  type: 'object',
  properties: {
    browserSupport: {
      type: 'array',
    },
    locations: {
      type: 'object',
      properties: {
        javascript: {
          type: 'object',
          properties: {
            src: {
              type: 'array',
            },
            dist: {
              type: 'string',
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
};
