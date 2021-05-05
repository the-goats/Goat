import { get } from 'lodash';
import getGlobalConfig from '../settings/getGlobalConfig';
import modules from '../../modules';

/**
 * Collect available modules
 * @returns {Array}
 */
async function collectModules() {
  const globalGoat = await getGlobalConfig();
  let userModules = get(globalGoat, 'modules');
  if (!userModules) {
    return modules;
  }
  userModules = userModules.map((module: any) => ({
    ...module,
    global: true,
  }));
  return modules.concat(userModules);
}

export default collectModules();
