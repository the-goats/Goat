import { addDecorator } from '@storybook/html';
import { useEffect } from '@storybook/client-api';
import Twig from 'twig';
import { setupTwig } from './setupTwig';

// If in a Drupal project, it's recommended to import a symlinked version of drupal.js.
import './_drupal';
// import '../components/styles.scss';
// console.log(process.cwd());
// const test = import();

// addDecorator deprecated, but not sure how to use this otherwise.
addDecorator((storyFn) => {
  // eslint-disable-next-line no-undef
  useEffect(() => Drupal.attachBehaviors(), []);
  return storyFn();
});

setupTwig(Twig);
