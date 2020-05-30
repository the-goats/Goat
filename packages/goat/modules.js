module.exports = [
  {
    name: 'Goat Styles',
    package: '@geit/styles',
    description: 'A comprehensive task to compile SCSS to CSS',
    default: true,
  },
  {
    name: 'Goat Babel',
    package: '@geit/babel',
    description: 'Compile ES6 code',
    default: true,
  },
  {
    name: 'Goat ESlint',
    package: '@geit/eslint',
    description: 'Lint JS code',
    default: true,
  },
  {
    name: 'Goat Modernizr',
    package: '@geit/modernizr',
    description: 'Generate a custom modernizr file',
    default: true,
  },
  {
    name: 'Goat Styleguide',
    package: '@geit/fractal',
    description: 'Generate and manage a styleguide based on Fractal',
    default: false,
  },
];
