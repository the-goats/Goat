module.exports = {
  id: '/Styleguide',
  type: 'object',
  properties: {
    author: {
      type: 'string',
      default: 'PROJECT_AUTHOR',
    },
    locations: {
      type: 'object',
      properties: {
        styleguide: {
          type: 'object',
          properties: {
            components: {
              type: 'string',
              default: 'components/',
            },
            docs: {
              type: 'string',
              default: 'docs/',
            },
          },
        },
      },
    },
    nameSpaces: {
      type: 'object',
      default: {
        protons: '01-protons',
        atoms: '02-atoms',
        molecules: '03-molecules',
        organisms: '04-organisms',
        templates: '05-templates',
        pages: '06-pages',
      },
    },
    styleguide: {
      type: 'object',
      properties: {
        skin: {
          type: 'string',
          default: 'navy',
        },
        panels: {
          type: 'array',
          items: {
            type: 'string',
          },
          default: ['info', 'html', 'view', 'context', 'resources', 'notes'],
        },
        server: {
          type: 'object',
          properties: {
            concurrency: {
              type: 'number',
              default: 10,
            },
            sync: {
              type: 'boolean',
              default: true,
            },
          },
        },
      },
    },
  },
};
