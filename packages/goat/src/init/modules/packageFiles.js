const { writeFile } = require('fs').promises;
const mkdirp = require('mkdirp');

/**
 * Check if a package has any project files
 * @param {array} packages
 */
function processPackageFiles(packages) {
  packages.forEach((package) => {
    if (!package.init.files) {
      return;
    }
    const files = package.init.files().files;
    copyPackageFiles(files);
  });
}

/**
 * Create project files from package
 * @param {array} files
 */
function copyPackageFiles(files) {
  files.forEach((file) => {
    mkdirp(file.destination)
    .then(() => writeFile(`${file.destination}/${file.name}`, file.data))
    .catch(error => console.error(error));
  })
}

module.exports = processPackageFiles;
