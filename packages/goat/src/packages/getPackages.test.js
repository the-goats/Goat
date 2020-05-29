const getPackages = require('./getPackages');
const Goat = require('../bootstrap/bootstrap');

const config = {
  goatVersion: '1.5.0',
  functions: [
    '@geit/styles',
    '@geit/babel',
    '@geit/eslint',
    '@geit/modernizr'
  ],
  modules: [
    {
      name: 'Goat Styles',
      package: '@geit/styles'
    },
    {
      name: 'Goat Babel',
      package: '@geit/babel'
    },
    {
      name: 'Goat ESlint',
      package: '@geit/eslint'
    },
    {
      name: 'Goat Modernizr',
      package: '@geit/modernizr'
    }
  ]
};

test('Get array of packages', async () => {
  const packages = await getPackages(config);
  expect(Array.isArray(packages)).toBe(true);
  packages.forEach((item) => {
    expect(item instanceof Goat).toBe(true);
  });
});