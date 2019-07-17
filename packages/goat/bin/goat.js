#!/usr/bin/env node

'use strict';

(async function () {
  let goat = require('commander');
  const {
    version
  } = require('../package.json');

  goat
    .version(version)
    .description('Goat');

  const init = require('../scripts/actions/init');
  goat
    .command('init')
    .alias('i')
    .description('Initialize Goat')
    .action(() => init());
  if (process.argv[2] === 'init') {
    goat.parse(process.argv);
    return
  }


  const config = await require('../scripts/config/goatConfig')();
  if (!config) {
    return
  }

  if (config) {
    const Goat = require('../scripts/bootstrap/bootstrap');

    const packages = [
      '@goat/styles',
      '@goat/js',
      '@goat/modernizr'
    ]

    packages.forEach((goatPackage) => {
      if (config.functions.includes(goatPackage)) {
        const plugin = require(goatPackage);
        goat = plugin.actions(goat, Goat);
      }
    })
  }

  
  goat.parse(process.argv);
  // No command specified
  if (goat.args.length === 0) {
    goat.help();
  }


}());