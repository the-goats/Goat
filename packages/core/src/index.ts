import Goat, { TGoatMethodConfig } from './Goat';
import watch from './events/watch';
import goatConfig from './config/goatConfig';
import { IGoatInternalProjectConfig, IGoatExternalProjectConfig } from './config';
import GoatEvents from './events/GoatEvents';
import notify from './notifier';
import generateConfig from './schemas/generateConfig';

export {
  Goat,
  generateConfig,
  goatConfig,
  notify,
  watch,
  GoatEvents,
  TGoatMethodConfig,
  IGoatInternalProjectConfig,
  IGoatExternalProjectConfig,
};
