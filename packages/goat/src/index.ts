import Goat, { IGoatProjectConfig } from './Goat';
import goatEvents from './events/GoatEvents';
import watch from './events/watch';
import goatConfig from './config/goatConfig';
import generateConfig from './schemas/generateConfig';

export {
  Goat, goatConfig, watch, goatEvents, generateConfig, IGoatProjectConfig,
};
