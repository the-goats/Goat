import { TGoatMethodConfig } from '@the-goat/goat';
import { resolve } from 'path';

/**
 * Get Configured TypeScript loader
 */
export default function getTsLoader(config: TGoatMethodConfig) {
  return {
    test: /\.tsx?$/,
    exclude: resolve(config.path, 'node_modules'),
    loader: require.resolve('ts-loader'),
    options: {},
  };
}
