module.exports = {
  id: '/Stories',
  type: 'object',
  properties: {
    locations: {
      type: 'object',
      properties: {
        stories: {
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
      },
      required: ['stories'],
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
    stories: {
      type: 'object',
      properties: {
        namespaces: {
          type: 'object',
        },
      },
      required: ['namespaces'],
    },
  },
  required: ['locations', 'styles', 'stories'],
};
