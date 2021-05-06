const { readFileSync } = require('fs');
const { join } = require('path');

module.exports = {
  files: [
    {
      name: 'preview.js',
      destination: '.goat/',
      data: readFileSync(join(__dirname, './files/preview.js'), 'utf8'),
    },
  ],
};
