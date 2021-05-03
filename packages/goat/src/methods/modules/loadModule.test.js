const loadModule = require('./loadModule');
const Goat = require('../../bootstrap/bootstrap');

test('Load a module', () => {
  const modules = [
    { name: 'Goat Styles', package: '@geit/styles' },
    { name: 'Goat Babel', package: '@geit/babel' },
    { name: 'Goat ESlint', package: '@geit/eslint' },
  ];

  modules.forEach((ref) => {
    const module = loadModule(ref);
    expect(typeof module).toBe('function');
    const result = module(Goat);
    expect(result instanceof Goat).toBe(true);
  });
});
