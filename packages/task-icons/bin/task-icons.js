#!/usr/bin/env node

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [nodeBin, runScript, sourceFolder, destinationFolder] = process.argv;

if (!sourceFolder || !destinationFolder) {
  console.log(`Usage:\n\n${runScript} <source_folder> <destination_folder>`);
  process.exit(0);
}

require('../dist/index')
  .method({
    configuration: {
      locations: {
        icons: {
          src: sourceFolder,
          dist: destinationFolder,
        },
      },
      icons: {
        fontName: 'icons',
        prefix: 'icon',
        fontDirectory: 'fonts',
        styles: {
          filename: 'style',
        },
        generate: {
          woff: true,
          eot: false,
          ttf: false,
          woff2: true,
          preview: true,
          json: true,
          variables: true,
          mixins: true,
          css: true,
          styles: true,
          selection: true,
          svg: true,
          symbol: true,
        },
      },
    },
  })
  .then(() => {
    console.log('Task finished');
  });
