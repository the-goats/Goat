const _ = require('lodash');
const modernizr = require('customizr');

module.exports = ({
  path,
  configuration,
}) => {
  const { locations, js } = configuration;
  let jsPaths = _.isArray(locations.javascript.src) ? _.map(locations.javascript.src, item => `${path}/${item}/**/*.js`) : locations.javascript.src;
  return modernizr({
    cache: true,
    devFile: false,
    dest: `${path}/${locations.javascript.libraries}modernizr.js`,
    options: [
      'setClasses',
      'addTest',
      'html5printshiv',
      'testProp',
      'fnBind'
    ],
    uglify: js.minify || false,
    tests: js.modernizr.include || [],
    excludeTests: js.modernizr.exclude || [],
    crawl: true,
    useBuffers: false,
    files: {
      src: _.union([
        locations.styles.src ? `${path}/${locations.styles.src}/**/*.s+(a|c)ss` : [], 
        locations.javascript.libraries ? `!${path}/${locations.javascript.libraries}**/*.js` : [] 
      ], jsPaths)
    },
    customTests: []
  });
}