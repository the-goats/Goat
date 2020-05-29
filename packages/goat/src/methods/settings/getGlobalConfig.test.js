const getGlobalConfig = require('./getGlobalConfig');

test('Get the global config', async () => {
  const config = await getGlobalConfig();
  expect(typeof config).toBe('object');
  expect(Array.isArray(config.modules)).toBe(true);
});
