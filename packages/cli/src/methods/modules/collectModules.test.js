const collectModules = require('./collectModules');

function isPromise(object) {
  if (Promise && Promise.resolve) {
    return Promise.resolve(object) === object;
  }
  throw new Error('Promise not supported in your environment');
}

test('Collect available modules', async () => {
  expect(isPromise(collectModules)).toBe(true);
  expect(Array.isArray(await collectModules)).toBe(true);
  (await collectModules).forEach((module) => {
    expect(module).toHaveProperty('name');
    expect(module).toHaveProperty('package');
    expect(module).toHaveProperty('default');
  });
});
