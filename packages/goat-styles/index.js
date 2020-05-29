module.exports = (Goat) => {
  return new Goat({
    name: 'Styles',
    command: 'styles',
    description: 'Compile Styles',
    schema: require('./scripts/schema'),
    method: (config) => {
      const sizeReport = require('gulp-sizereport');
      const getSettings = require('./scripts/getSettings');
      const { compileStyles } = require('./scripts/compileStyles');
      const settings = getSettings(config);
      return new Promise((resolve) => {
        compileStyles({ ...config, settings }).pipe(sizeReport());
        resolve(true);
      });
    },
    watch: (config) => {
      const sizeReport = require('gulp-sizereport');
      const getSettings = require('./scripts/getSettings');
      const { compileStyles } = require('./scripts/compileStyles');
      const { events } = config;
      const settings = getSettings(config);
      compileStyles({ ...config, settings }).pipe(sizeReport());
      events.watch({
        name: 'Styles',
        pattern: '**/*.s+(a|c)ss',
        events: /file:/,
        method: () => {
          const { compileStyles } = require('./scripts/compileStyles');
          compileStyles({ ...config, settings }).pipe(sizeReport());
        },
      });
    },
    init: {
      configuration: require('./init/configuration.json'),
    },
  });
};
