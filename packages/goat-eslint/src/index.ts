import { Goat } from '@the-goat/goat';

export default () => new Goat({
  name: 'Eslint',
  command: 'eslint',
  description: 'Run eslint',
  schema: require('../scripts/schema'),
  method: (config) => {
    const { processEslint } = require('../scripts/eslint');
    return new Promise((resolve) => {
      const { configuration } = config;
      const sources = Array.isArray(configuration.locations.javascript.src)
        ? configuration.locations.javascript.src
        : [configuration.locations.javascript.src];
      processEslint({
        ...config,
        sources,
      });
      resolve();
    });
  },
  watch: (config) => {
    const { processEslint, processEslintFile } = require('../scripts/eslint');
    const { normalize } = require('path');
    const { configuration, events } = config;
    const sources: string[] = Array.isArray(configuration.locations.javascript.src)
      ? configuration.locations.javascript.src
      : [configuration.locations.javascript.src];
    processEslint({
      ...config,
      sources,
    });
    const paths = sources.map((item) => normalize(`${item}/**/*.es6.js`));
    events.watch({
      name: 'Eslint',
      pattern: paths,
      events: /file:/,
      method: (data: { path: string }) => {
        processEslintFile({
          ...config,
          file: data.path,
        });
      },
    });
  },
});
