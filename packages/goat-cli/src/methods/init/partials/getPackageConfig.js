/**
 * Get config of packages
 * @param {array} pckg
 * @returns {object}
 */
function getPackageConfig(pckg) {
  const { merge } = require('lodash');
  const generateConfig = require('../../../schemas/generateConfig');

  if (!Array.isArray(pckg)) {
    return generateConfig(pckg.init.schema);
  }

  return pckg.reduce((result = {}, currentValue) => {
    const config = generateConfig(currentValue.init.schema);
    return merge(result, config);
  });
}

module.exports = getPackageConfig;
