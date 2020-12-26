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
              default: 'icons/src/',
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
        tag: {
          type: 'string',
          default: 'span',
        },
      },
    },
  },
  required: ['locations'],
};
