const babel = require("@babel/core");
const getFiles = require('./helpers/readdir');
const {
  readFile,
  writeFile
} = require('fs');
const {
  normalize
} = require('path');

/**
 * Process single .es6.js file. This function generates the new es5 ready file.
 * @param {Object} config
 */
const processBabelFile = (config) => {
  const { file, configuration, Notifier, events } = config;
  readFile(file, async (err, data) => {
    if (err) throw err;
    const code = (await bablyfy(data.toString(), configuration.browserSupport)).code
    writeFile(file.replace('.es6', ''), code, () => {
      if (events) {
        events.emit({ 
          event: 'js:compile',
          path: file,
          properties: {}, 
        });
      }
    });
  });
}

/**
 * Convert Supplied data to es5 ready js with babel
 * @param {String} data
 * @param {Array, String} browserSupport
 * @returns {String} result
 */
const bablyfy = (data, browserSupport) => babel.transformAsync(data, {
  presets: [
    [require.resolve('babel-preset-airbnb'),
      {
        modules: false,
        targets: {
          browsers: browserSupport || ["> 1%", "last 2 versions"],
        },
      },
    ],
  ],
});

/**
 * Process all files in the supplied paths
 * @param {Object} config - Object containing all configuration supplied by goat
 */
const processBabel = (config) => {
  const { sources, path } = config;
  sources.forEach((source) => {
    (async (path) => {
      for await (const file of getFiles(path,  /\.es6\.js$/gm)) {
        processBabelFile({
          ...config,
          file,
        });
      };
    })(normalize(`${path}/${source}`));
  });
}

module.exports = { processBabel, processBabelFile } 
