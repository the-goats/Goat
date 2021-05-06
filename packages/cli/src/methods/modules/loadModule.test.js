import { Goat } from '@the-goat/goat';
import loadModule from './loadModule';

test('Load a module', () => {
  const modules = [
    { name: 'Goat Styles', package: '@the-goat/styles' },
    { name: 'Goat Babel', package: '@the-goat/babel' },
    { name: 'Goat ESlint', package: '@the-goat/eslint' },
  ];

  modules.forEach((ref) => {
    const module = loadModule(ref);
    expect(typeof module).toBe('function');
    const result = module(Goat);
    expect(result instanceof Goat).toBe(true);
  });
});
