const Linter = require("eslint").Linter;
const getFiles = require('./helpers/readdir');
const eslintConfig = require('eslint-config-airbnb-base');
const chokidar = require('chokidar');
const {
  readFile
} = require('fs');
const {
  normalize
} = require('path');

let Logger;
let config;
let basePath;

const processFiles = async (path) => {
  for await (const file of getFiles(path, /\.js$/gm)) {
    readJsFile(file);
  };
}

const readJsFile = (file) => {
  readFile(file, async (err, data) => {
    if (err) throw err;
    const result = lint(data.toString(), { es6: file.includes('.es6.')});
    if (result.length > 0) {
      log(file.replace(basePath, ''), result);
    }
  });
}

const lint = (data, options) => {
  const linter = new Linter();
  return linter.verify(data, {
    env: {
      browser: true,
      es6: config.js.eslint.es6 ? true : options.es6,
    },
    extends: eslintConfig,
    parserOptions: {
      parser: 'babel-eslint',
    },
    ...config.js.eslint.config,
  });
};

const log = (file, result) => {
  Logger.error(`Error(s) on ${file}`);
  result.forEach((item) => {
    const message = `\t- ${item.ruleId}: ${item.message} on ${item.line}:${item.column} to ${item.endLine}:${item.endColumn}`;
    if (item.severity === 2) {
      Logger.log(Logger.style.red(message));
    } else if (item.severity === 1) {
      Logger.log(Logger.style.yellow(message));
    } else {
      Logger.log(Logger.style.green(message));
    }
  })
  Logger.log('\n');
}

const process = (sources) => {
  sources.forEach((source) => {
    processFiles(normalize(`${basePath}/${source}`));
  });
}


const watch = (config, sources) => {
  process(sources);
  const paths = config.locations.javascript.src.map(item => normalize(`${basePath}/${item}/**/*.js`));
  chokidar.watch(paths, {
    persistent: true,
    ignoreInitial: true,
  }).on('change', (path) => {
    Logger.log(Logger.style.bold(`File ${path} has been changed`));
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
  config = configuration;
  basePath = path;

  const sources = typeof configuration.locations.javascript.src === 'Array' ? configuration.locations.javascript.src : [configuration.locations.javascript.src];
  
  if (options.watch) {
    watch(config, sources);
    return null;
  }
  
  process(sources);
}
