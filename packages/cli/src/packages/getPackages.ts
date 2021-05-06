import { Goat, IGoatInternalProjectConfig } from '@the-goat/core';
import loadModule from '../methods/modules/loadModule';

/**
 * Collect modules
 */
export default async function getModules({ modules }: IGoatInternalProjectConfig):Promise<Goat[]> {
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
