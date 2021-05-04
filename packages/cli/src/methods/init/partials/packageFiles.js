import Notifier from '@the-goat/notifier';

const { writeFile } = require('fs').promises;
const mkdirp = require('mkdirp');

/**
 * Create project files from package
 * @param {array} files
 */
function copyPackageFiles(files) {
  files.forEach((file) => {
    mkdirp(file.destination)
      .then(() => writeFile(`${file.destination}/${file.name}`, file.data))
      .catch((error) => Notifier.error(error));
  });
}

/**
 * Check if a package has any project files
 * @param {array} packages
 */
function processPackageFiles(packages) {
  packages.forEach((pckg) => {
    if (!pckg.init.files) {
      return;
    }
    const { files } = pckg.init.files();
    copyPackageFiles(files);
  });
}

module.exports = processPackageFiles;
