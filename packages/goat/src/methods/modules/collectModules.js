const { get } = require('lodash');
const getGlobalConfig = require('../settings/getGlobalConfig');

async function collectModules() {
  const globalGoat = await getGlobalConfig();
  const modules = require('../../../modules');
  let userModules = get(globalGoat, 'modules');
  if (!userModules) {
    return modules;
  }
  userModules = userModules.map((module) => ({
    ...module,
    global: true,
  }));
  return modules.concat( userModules )
}

module.exports = collectModules();