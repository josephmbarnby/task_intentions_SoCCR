// React import
import React from 'react';
import {render} from 'react-dom';

// Screen component
import {Screen} from './Screen';

// Other imports
import consola from 'consola';

/**
 * Switch between different screens
 * @param {string} type screen type
 * @param {HTMLElement} target target DOM element
 * @param {any} props collection of props
 * @param {number} timeout duration
 * @param {Function} callback function to run
 */
export function displayScreen(
    type: string,
    target: HTMLElement,
    props: any,
    timeout=0,
    callback=() => {
      consola.info('No callback defined for timeout');
    },
): void {
  render(
      <Screen
        screenType={type}
        screenProps={props}
      />,
      target,
  );

  // Setup a timeout to execute the callback
  if (timeout > 0) {
    setTimeout(() => {
      callback();
    }, timeout);
  }
}
