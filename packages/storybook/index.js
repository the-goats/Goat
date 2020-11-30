module.exports = (Goat) => new Goat({
  name: 'Storybook',
  command: 'story',
  description: 'Manage a design system using storybook',
  schema: require('./scripts/schema'),
  async method() {
    const server = require('@storybook/core/server');
    function interopRequireDefault(obj) {
      // eslint-disable-next-line no-underscore-dangle
      return obj && obj.__esModule ? obj : { default: obj };
    }

    const options = interopRequireDefault(require('@storybook/html/dist/server/options'));

    // console.log(server, options);
    server.buildDev({
      ...options.default,
      configDir: './.goat',
    });
    // (0, server.buildDev)(options.default);
    // runAll(config);
  },
  watch(config) {
    console.log(config);
    // const { configuration, events } = config;
    // const { normalize } = require('path');
    // const { runAll, runSingle } = require('./scripts/runner');
    // const sources = Array.isArray(configuration.locations.javascript.src) ? configuration.locations.javascript.src : [configuration.locations.javascript.src];
    // const paths = sources.map((item) => normalize(`${item}/**/*.+(es6.js|ts)`));
    // runAll(config);
    // events.watch({
    //   name: 'Babel',
    //   pattern: paths,
    //   events: /file:/,
    //   method: (data) => runSingle(config, data.path),
    // });
  },
  init: {
    configuration: require('./init/configuration.json'),
  },
});
