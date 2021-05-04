import { Goat } from '@the-goat/goat';

export default () => new Goat({
  name: 'JS Bundler',
  command: 'js',
  description: 'Bundle Javascript',
  schema: require('./scripts/schema'),
  method(config) {
    const { runAll } = require('./scripts/runner');
    return runAll(config);
  },
  watch(config) {
    const { configuration, events } = config;
    const { normalize } = require('path');
    const { runAll, runSingle } = require('./scripts/runner');
    const sources: string[] = Array.isArray(configuration.locations.javascript.src)
      ? configuration.locations.javascript.src
      : [configuration.locations.javascript.src];
    const paths = sources.map((item) => normalize(`${item}/**/*.+(es6.js|ts)`));
    runAll(config);
    events.watch({
      name: 'Babel',
      pattern: paths,
      events: /file:/,
      method: (data: { path: string }) => runSingle(config, data.path),
    });
  },
});
