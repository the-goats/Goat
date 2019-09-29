const fs = require('fs');

/**
 * Setup a symlink
 * @param {string} source
 * @param {string} destination
 * @returns {object}
 */
const createSymlink = (source, destination) => {
  return fs.promises.symlink(source, destination);
}

/**
 * Check if a path is a symlink
 * @param {string} source
 * @returns {object}
 */
const checkSymLinkExists = (source) => {
  return new Promise(async (resolve) => {
    try {
      resolve(await fs.promises.readlink(source));
    } catch {
      resolve(false);
    }
  })
}

module.exports = { createSymlink, checkSymLinkExists };
