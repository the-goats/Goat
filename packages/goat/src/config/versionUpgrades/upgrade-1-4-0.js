const { omit } = require('lodash');

function upgrade(config) {
  const goatModules = require('../../../modules');
  config.modules = config.functions.map((package) => {
    const module = goatModules.find(gM => gM.package === package);
    if (module) {
      return omit(module, ['default'])
    }
    return {
      name: package,
      package,
      global: true,
    }
  });
  return config;
}

module.exports = upgrade;
