import { Goat } from '@the-goat/goat';
import { runAll, runWatch } from './scripts/webpack/runner';

export default () => new Goat({
  name: 'Compile',
  command: 'compile',
  description: 'Webpack based compiler for TypeScript, JavaScript and SCSS',
  schema: require('./schema/schema.js'),
  options: [
    {
      label: 'Compile for production',
      flags: '-p, --production',
      allowOnOnce: true,
      allowOnWatch: true,
    },
    {
      label: 'Analyse javascript dependency sizes',
      flags: '-a, --analyse',
      allowOnOnce: true,
      allowOnWatch: false,
    },
  ],
  async method(config) {
    return runAll(config);
  },
  watch(config) {
    runWatch(config);
  },
  init: {
    files: () => require('./init/files.js'),
  },
});
