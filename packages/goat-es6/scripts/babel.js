const babel = require("@babel/core");
const getFiles = require('./helpers/readdir');
const chokidar = require('chokidar');
const {
  readFile,
  writeFile
} = require('fs');
const {
  normalize
} = require('path');

let Logger;
let basePath;
let browserSupport;

const processFiles = async (path, browserSupport) => {
  for await (const file of getFiles(path,  /\.es6\.js$/gm)) {
    readJsFile(file);
  };
}

const readJsFile = (file) => {
  readFile(file, async (err, data) => {
    if (err) throw err;
    const code = (await bablyfy(data.toString(), browserSupport)).code
    writeFile(file.replace('.es6', ''), code, () => Logger.icon(`${file} processed`, 'success'));
  });
}

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

const process = (sources) => {
  sources.forEach((source) => {
    processFiles(normalize(`${basePath}/${source}`));
  });
}

const watch = (configuration, sources) => {
  process(sources);
  const paths = configuration.locations.javascript.src.map(item => normalize(`${basePath}/${item}/**/*.es6.js`));
  chokidar.watch(paths, {
    persistent: true,
    ignoreInitial: true,
  }).on('change', (path) => {
    Logger.log(Logger.style.bold(`\nFile ${path} has been changed`));
    readJsFile(path);
  });
};

module.exports = ({
  path,
  configuration,
  Notifier,
  options,
}) => {
  Logger = Notifier;
  basePath = path;
  browserSupport = configuration.browserSupport;

  const sources = typeof configuration.locations.javascript.src === 'Array' ? configuration.locations.javascript.src : [configuration.locations.javascript.src];
  
  if (options.watch) {
    watch(configuration, sources);
    return null;
  }
  
  process(sources);
}
