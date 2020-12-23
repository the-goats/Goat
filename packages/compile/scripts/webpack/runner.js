/**
 * Get the destination for each file
 * @param {Object} config
 * @param {String} el
 * @returns {String}
 */
function getDest(config, el) {
  const { get } = require('lodash');
  const { dist, patterns } = config.configuration.locations;
  const { path } = config;
  const name = el.substring(0, el.lastIndexOf('.')).replace(`${path}/`, '');
  if (dist === '<source>') {
    return name;
  }
  if (get(config, 'configuration.bundler.destination.flat')) {
    return name.replace(name.substring(0, name.lastIndexOf('/')), dist);
  }
  const minimatch = require('minimatch');
  const { normalize } = require('path');
  const matchesPattern = patterns.find((pattern) => minimatch(el, `${normalize(path)}/${pattern.directory}/${pattern.pattern}`));
  return name.replace(matchesPattern.directory, dist);
}

/**
 * Format files array to entry files object to feed webpack
 * @param {Array} files
 * @param {String} path
 * @returns {Object}
 */
function formatEntryFiles(config) {
  const { files } = config;
  const { resolve } = require('path');
  return files.reduce((obj, el) => {
    const destination = getDest(config, el);
    return {
      ...obj,
      [destination]: resolve(el),
    };
  }, {});
}

let logHash;
/**
 * Log Webpack results
 * @param {Object} error
 * @param {Object} stats
 */
function logWebpack(error, stats) {
  if (error) {
    console.error(error);
    return;
  }
  if (stats.hash === logHash) {
    return;
  }
  logHash = stats.hash;

  console.info(stats.toString({
    assetsSort: '!size',
    usedExports: false,
    entrypoints: false,
    excludeAssets: [/\.*\.map/], // Hide source maps from output
    colors: true,
    modules: false,
    children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
    chunks: false,
    chunkModules: false,
  }));
}

/**
 * Run webpack
 * @param {Object} config
 */
function run(config) {
  // eslint-disable-next-line no-param-reassign
  const getWebpackSetup = require('./webpack.js');
  const compiler = getWebpackSetup(config);
  compiler.run(logWebpack);
}

/**
 * Run webpack
 * @param {Object} config
 */
function watch(config) {
  const getWebpackSetup = require('./webpack.js');
  const compiler = getWebpackSetup(config);
  compiler.watch({
    aggregateTimeout: 300,
    poll: undefined
  }, logWebpack);
}

/**
 * Get all files at the configured location
 * @param {Object} { path, configuration }
 * @returns {Array}
 */
function getFiles({ path, configuration }) {
  const { normalize } = require('path');
  const { sync } = require('glob');
  return configuration.locations.patterns.map((pattern) => sync(`${normalize(path)}/${pattern.directory}/${pattern.pattern}`)).flat();
}

/**
 * Entry for all file mode
 * @param {Object} config
 */
function runAll(config) {
  config.files = getFiles(config);
  config.entryFiles = formatEntryFiles(config);
  run(config);
}

/**
 * Entry for watching
 * @param {Object} config
 */
function runWatch(config) {
  config.files = getFiles(config);
  config.entryFiles = formatEntryFiles(config);
  watch(config);
}

module.exports = { runAll, runWatch };
