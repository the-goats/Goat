import Goat, { TGoatMethodConfig } from './Goat';
import watch from './events/watch';
import goatConfig from './config/goatConfig';
import generateConfig from './schemas/generateConfig';
import { IGoatInternalProjectConfig } from './config';
import GoatEvents from './events/GoatEvents';

export {
  Goat,
  goatConfig,
  watch,
  generateConfig,
  GoatEvents,
  TGoatMethodConfig,
  IGoatInternalProjectConfig,
};
