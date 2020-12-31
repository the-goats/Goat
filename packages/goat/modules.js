module.exports = [
  {
    name: 'Compile',
    package: '@the-goat/compile',
    description: 'Webpack based compiler for Javascript and scss',
    default: true,
  },
  {
    name: 'Goat Styles',
    package: '@geit/styles',
    description: 'A comprehensive task to compile SCSS to CSS',
    default: false,
  },
  {
    name: 'JS Bundler',
    package: '@geit/js-bundler',
    description: 'Compile and bundle js and/or ts',
    default: false,
  },
  {
    name: 'Goat Babel',
    package: '@geit/babel',
    description: 'Compile ES6 code',
    default: false,
  },
  {
    name: 'Goat ESlint',
    package: '@geit/eslint',
    description: 'Lint JS code',
    default: false,
  },
  {
    name: 'Goat Modernizr',
    package: '@geit/modernizr',
    description: 'Generate a custom modernizr file',
    default: false,
  },
  {
    name: 'Storybook',
    package: '@the-goat/storybook',
    description: 'Manage a design system using storybook',
    default: false,
  },
  {
    name: 'Icons',
    package: '@the-goat/icons',
    description: 'Generate icon font files based on svg files',
    default: false,
  },
];
