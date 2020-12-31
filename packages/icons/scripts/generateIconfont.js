function generateVariables(file) {
  const icons = file.match(/\$icons-map: \(.*,\n\);/s)[0].replace(/( |"|,)/g, '').split('\n').slice(1, -1);
  return icons.map((icon) => {
    const { 0: variable, 1: unicode } = icon.split(':\\');
    return `$icon-${variable}: "\\${unicode}";`;
  }).join('\n');
}

function writeFile(file, content) {
  const { writeFileSync } = require('fs');
  writeFileSync(file, `${content}\n`);
}

function generateIconfont(config) {
  const { generateFonts } = require('fantasticon');

  generateFonts({
    name: 'icons',
    inputDir: config.configuration.locations.icons.src, // (required)
    outputDir: config.configuration.locations.icons.dist,
    fontTypes: ['eot', 'woff2', 'woff', 'ttf', 'svg'],
    assetTypes: ['scss', 'json'],
    fontsUrl: `${config.configuration.locations.icons.dist}`,
    formatOptions: {
      json: {
        indent: 2,
      },
    },
    tag: config.configuration.icons.tag,
    pathOptions: {
      json: `${config.configuration.locations.icons.dist}/icons.json`,
    },
  }).then((results) => {
    const variables = generateVariables(results.assetsOut.scss);
    writeFile(`${config.configuration.locations.icons.dist}/variables.scss`, variables);
    console.log(variables);
    const { Notifier } = config;
    Notifier.log(`Icon font with ${Notifier.style.bold(Notifier.style.yellow(Object.keys(results.codepoints).length))} icons generated`);
  });
}

module.exports = generateIconfont;
