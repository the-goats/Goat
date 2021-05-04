import { Goat, IGoatProjectConfig } from '@the-goat/goat';
import loadModule from '../methods/modules/loadModule';

/**
 * Collect modules
 */
export default async function getModules({ modules }: IGoatProjectConfig) {
  return (
    modules
      // @ts-ignore
      .flatMap((item) => {
        const module = loadModule(item);
        if (Array.isArray(module)) {
          return module.map((task) => task(Goat));
        }
        return module();
      })
      .filter((item:any) => !!item)
  );
}
