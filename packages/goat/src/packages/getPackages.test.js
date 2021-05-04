import Goat from '../bootstrap';
import getPackages from './getPackages';

const config = {
  goatVersion: '1.5.0',
  functions: [
    '@the-goat/styles',
    '@the-goat/babel',
    '@the-goat/eslint',
    '@the-goat/modernizr',
  ],
  modules: [
    {
      name: 'Goat Styles',
      package: '@the-goat/styles',
    },
    {
      name: 'Goat Babel',
      package: '@the-goat/babel',
    },
    {
      name: 'Goat ESlint',
      package: '@the-goat/eslint',
    },
    {
      name: 'Goat Modernizr',
      package: '@the-goat/modernizr',
    },
  ],
};

test('Get array of packages', async () => {
  const packages = await getPackages(config);
  expect(Array.isArray(packages)).toBe(true);
  packages.forEach((item) => {
    expect(item instanceof Goat).toBe(true);
  });
});
