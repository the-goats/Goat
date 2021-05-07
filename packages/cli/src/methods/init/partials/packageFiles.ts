import { notify as Notifier } from '@the-goat/core';
import { promises } from 'fs';
import mkdirp from 'mkdirp';

const { writeFile } = promises;

/**
 * Create project files from package
 * @param {array} files
 */
function copyPackageFiles(files) {
  files.forEach(file => {
    mkdirp(file.destination)
      .then(() => writeFile(`${file.destination}/${file.name}`, file.data))
      .catch(error => Notifier.error(error));
  });
}

/**
 * Check if a package has any project files
 * @param {array} packages
 */
export default function processPackageFiles(packages) {
  packages.forEach(pckg => {
    if (!pckg.init.files) {
      return;
    }
    const { files } = pckg.init.files();
    copyPackageFiles(files);
  });
}
