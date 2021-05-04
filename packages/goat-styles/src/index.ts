import { Goat } from '@the-goat/goat';

export default () => new Goat({
  name: 'Styles',
  command: 'styles',
  description: 'Compile Styles',
  schema: require('./scripts/schema'),
  method: (config) => {
    const sizeReport = require('gulp-sizereport');
    const getSettings = require('./scripts/getSettings');
    const { compileStyles } = require('./scripts/compileStyles');
    const settings = getSettings(config);
    return new Promise((resolve, reject) => {
      const gulpStream = compileStyles({ ...config, settings }).pipe(sizeReport());
      gulpStream.on('end', resolve);
      gulpStream.on('error', reject);
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
        compileStyles({ ...config, settings }).pipe(sizeReport());
      },
    });
  },
});
