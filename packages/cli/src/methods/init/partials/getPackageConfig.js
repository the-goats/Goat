import { generateConfig } from '@the-goat/core';

/**
 * Get config of packages
 * @param {array} pckg
 * @returns {object}
 */
export default function getPackageConfig(pckg) {
  const { merge } = require('lodash');

  if (!Array.isArray(pckg)) {
    return generateConfig(pckg.init.schema);
  }

  return pckg.reduce((result = {}, currentValue) => {
    const config = generateConfig(currentValue.init.schema);
    return merge(result, config);
  });
}
