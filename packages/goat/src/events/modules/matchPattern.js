const miniMatch = require('minimatch');

/**
 * Check if given file matches one or more patterns
 * @param {String} file
 * @param {String|Array} pattern
 * @returns {Boolean}
 */
function matchPattern(file, pattern) {
  if (!Array.isArray(pattern)) {
    return miniMatch(file, pattern);
  }
  return pattern.filter(item => miniMatch(file, item)).length > 0;
}

module.exports = matchPattern;
