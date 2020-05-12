module.exports = {
  id: '/Styleguide',
  type: 'object',
  properties: {
    author: {
      type: 'string',
    },
    locations : {
      type: 'object',
      properties: {
        styleguide : {
          type: 'object',
          properties: {
            components: {
                type: 'string'
              },
            docs: {
              type: 'string'
            }
          }
        }
      }
    },
    nameSpaces: {
      type: 'object',
    },
    styleguide: {
      type: 'object',
      properties: {
        skin: {
          type: 'string',
        },
        panels: {
          type: 'array',
        },
        server: {
          type: 'object',
          properties: {
            concurrency: {
              type: 'number',
            },
            sync: {
              type: 'boolean',
            },
          },
        },
      },
    },
  },
};
