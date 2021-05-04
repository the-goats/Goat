import { Goat } from '@the-goat/goat';

export default () => new Goat({
  name: 'Babel',
  command: 'babel',
  description: 'Compile .es6.js files using babel',
  schema: require('../scripts/schema'),
  method: (config) => {
    const { processBabel } = require('../scripts/babel');
    return new Promise((resolve) => {
      const { configuration } = config;
      const sources = Array.isArray(configuration.locations.javascript.src)
        ? configuration.locations.javascript.src
        : [configuration.locations.javascript.src];
      processBabel({
        ...config,
        sources,
      });
      resolve();
    });
  },
  watch: (config) => {
    const { normalize } = require('path');
    const { processBabel, processBabelFile } = require('../scripts/babel');
    const { configuration, events } = config;
    const sources: string[] = Array.isArray(configuration.locations.javascript.src)
      ? configuration.locations.javascript.src
      : [configuration.locations.javascript.src];
    processBabel({
      ...config,
      sources,
    });
    const paths = sources.map((item) => normalize(`${item}/**/*.es6.js`));
    events.watch({
      name: 'Babel',
      pattern: paths,
      events: /file:/,
      method: (data: { path: string }) => {
        processBabelFile({
          ...config,
          file: data.path,
        });
      },
    });
  },
});
