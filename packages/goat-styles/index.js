const { compileStyles } = require('./scripts/compileStyles');
const schema = require('./scripts/schema');
const initConfiguration = require('./init/configuration.json');
const sizeReport = require('gulp-sizereport');
const getSettings = require('./scripts/getSettings');

module.exports = (Goat) => {
  return new Goat({
    name: 'Styles',
    command: 'styles',
    description: 'Compile Styles',
    schema,
    method: (config) => {
      const settings = getSettings(config);
      return new Promise((resolve) => {
        compileStyles({ ...config, settings }).pipe(sizeReport());
        resolve(true);
      });
    },
    watch: (config) => {
      const { events } = config;
      const settings = getSettings(config);
      compileStyles({ ...config, settings }).pipe(sizeReport());
      events.watch({
        name: 'Synetic Styles',
        pattern: '**/*.s+(a|c)ss',
        events: /file:/,
        method: () => {
          compileStyles({ ...config, settings }).pipe(sizeReport());
        },
      });
    },
    init: {
      configuration: initConfiguration,
    }
  });
};
