const getPackages = require('./getPackages');

const config = {
  "goatVersion": "1.2.1",
  "functions": [
    "@goat-cli/styles",
    "@goat-cli/es6",
    "@goat-cli/eslint",
    "@goat-cli/modernizr",
    "@goat-cli/fractal"
  ]
};

test.each`
  config | expected
  ${'file:change'} | ${true}
`('returns $expected when config $config', ({ config, expected }) => {
  expect(getPackages(config)).toBe(expected);
});


// const result = [
//   Goat {
//     name: 'Styles',
//     command: 'styles',
//     description: 'Compile Styles',
//     schema: {
//       id: '/SyneticStyles',
//       type: 'object',
//       properties: [Object],
//       styles: [Object]
//     },
//     method: [Function: method],
//     watch: [Function: watch],
//     path: '/c/www/goat/goat-examples',
//     init: { configuration: [Object] },
//     Notifier: Notifier { style: [Object] },
//     configuration: null,
//     events: goatEvents {
//       _events: [Object: null prototype] {},
//       _eventsCount: 0,
//       _maxListeners: undefined
//     }
//   },
//   Goat {
//     name: 'Babel',
//     command: 'babel',
//     description: 'Compile .es6.js files using babel',
//     schema: { id: '/SyneticEs6', type: 'object', properties: [Object] },
//     method: [Function: method],
//     watch: [Function: watch],
//     path: '/c/www/goat/goat-examples',
//     init: { configuration: [Object] },
//     Notifier: Notifier { style: [Object] },
//     configuration: null,
//     events: goatEvents {
//       _events: [Object: null prototype] {},
//       _eventsCount: 0,
//       _maxListeners: undefined
//     }
//   },
//   Goat {
//     name: 'Eslint',
//     command: 'eslint',
//     description: 'Run eslint',
//     schema: {
//       id: '/SyneticEs6',
//       type: 'object',
//       properties: [Object],
//       js: [Object]
//     },
//     method: [Function: method],
//     watch: [Function: watch],
//     path: '/c/www/goat/goat-examples',
//     init: { configuration: [Object] },
//     Notifier: Notifier { style: [Object] },
//     configuration: null,
//     events: goatEvents {
//       _events: [Object: null prototype] {},
//       _eventsCount: 0,
//       _maxListeners: undefined
//     }
//   },
//   Goat {
//     name: 'Modernizr',
//     command: 'modernizr',
//     description: 'Generate a custom Modernizr file',
//     schema: {
//       id: '/SyneticModernizr',
//       type: 'object',
//       properties: [Object],
//       js: [Object]
//     },
//     method: [Function: method],
//     watch: undefined,
//     path: '/c/www/goat/goat-examples',
//     init: { configuration: [Object] },
//     Notifier: Notifier { style: [Object] },
//     configuration: null,
//     events: goatEvents {
//       _events: [Object: null prototype] {},
//       _eventsCount: 0,
//       _maxListeners: undefined
//     }
//   },
//   Goat {
//     name: 'Styleguide',
//     command: 'styleguide',
//     description: 'Compile Styleguide',
//     schema: { id: '/SyneticFractal', type: 'object', properties: [Object] },
//     method: [Function: method],
//     watch: undefined,
//     path: '/c/www/goat/goat-examples',
//     init: { configuration: [Object] },
//     Notifier: Notifier { style: [Object] },
//     configuration: null,
//     events: goatEvents {
//       _events: [Object: null prototype] {},
//       _eventsCount: 0,
//       _maxListeners: undefined
//     }
//   }
// ];