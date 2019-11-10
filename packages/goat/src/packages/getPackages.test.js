const getPackages = require('./getPackages');
const Goat = require('../bootstrap/bootstrap');

const config = {
  goatVersion: '1.0.0',
  functions: [
    '@geit/styles',
    '@geit/es6',
    '@geit/eslint',
    '@geit/modernizr',
    '@geit/fractal',
  ],
};

test('Get array of packages', () => {
  const packages = getPackages(config);
  expect(Array.isArray(packages)).toBe(true);
  packages.forEach((item) => {
    expect(item instanceof Goat).toBe(true);
  });
});
