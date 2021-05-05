import Goat, { TGoatMethodConfig } from './Goat';
import goatEvents from './events/GoatEvents';
import watch from './events/watch';
import goatConfig from './config/goatConfig';
import generateConfig from './schemas/generateConfig';
import { IGoatInternalProjectConfig } from './config';

export {
  Goat,
  goatConfig,
  watch,
  goatEvents,
  generateConfig,
  TGoatMethodConfig,
  IGoatInternalProjectConfig,
};
