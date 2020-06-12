/**
 * Log the results of a webpack build
 * @param {Object} Notifier
 * @param {Object} stats
 */
function logResults(Notifier, stats) {
  const info = stats.toJson();
  console.info(formatLog(Notifier, info));
  console.info(stats.toString({
    builtAt: false,
    assets: false,
    moduleAssets: true,
    cached: false,
    cachedAssets: false,
    chunks: false,
    entrypoints: false,
    colors: true,
    hash: false,
    modules: false,
    timings: false,
    version: false,
  }));  
}

/**
 * Format logdata to show a table like structure
 * @param {Object} Notifier
 * @param {Object} { assets, modules }
 * @returns {String}
 */
function formatLog(Notifier, { assets, modules }) {
  const set = modules
    .filter(module => module.depth === 0)
    .map(module => ({
      ...module,
      ...assets.filter(asset => module.chunks.includes(asset.chunks[0]))[0],
    }));

  const filesize = require('filesize');
  const srcLength = set.reduce((length, value) => value.id.length > length ? value.id.length : length, 0)  + 10;
  const distLength = set.reduce((length, value) => value.name.length > length ? value.name.length : length, 0) + 20;
  return set.reduce((accumulator, value) => {
    const line = `${Notifier.style.bold(value.id.replace('./', '')).padStart(srcLength)}  ${Notifier.style.green().bold(value.name).padEnd(distLength)}  ${filesize(value.size, { standard: "iec" })}`
    return accumulator += `\n${line}`;
  }, `${Notifier.style.bold('Source').padStart(srcLength)}  ${Notifier.style.bold('Result').padEnd(distLength - 10)}  ${Notifier.style.bold('Size')}`);
}

module.exports = logResults;