const { omit } = require('lodash');

function upgrade(config) {
  const goatModules = require('../../../modules');
  config.modules = config.functions.map((item) => {
    const module = goatModules.find(gM => gM.package === item);
    if (module) {
      return omit(module, ['default'])
    }
    return {
      name: item,
      package: item,
      global: true,
    }
  });
  return config;
}

module.exports = upgrade;
