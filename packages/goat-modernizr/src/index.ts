import { Goat } from '@the-goat/goat';

export default () => new Goat({
  name: 'Modernizr',
  command: 'modernizr',
  description: 'Generate a custom Modernizr file',
  schema: require('./scripts/schema'),
  method: (config) => {
    const buildModernizr = require('./scripts/modernizr');
    buildModernizr(config);
    return Promise.resolve();
  },
});
