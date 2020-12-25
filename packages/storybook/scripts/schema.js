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
          default: [
            {
              directory: 'components',
              pattern: '**/*.stories.js',
            },
          ],
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
          default: [
            'components/01-base/global.scss',
          ],
        },
      },
    },
    stories: {
      type: 'object',
      properties: {
        namespaces: {
          type: 'object',
        },
        default: {
          base: 'components/01-base',
          atoms: 'components/02-atoms',
          molecules: 'components/03-molecules',
          organisms: 'components/04-organisms',
          templates: 'components/05-templates',
          pages: 'components/06-pages',
        },
      },
      required: ['namespaces'],
    },
  },
  required: ['locations', 'styles', 'stories'],
};
