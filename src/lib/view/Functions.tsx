// React import
import React from 'react';
import {render} from 'react-dom';

// Screen component
import {Switcher} from './Switcher';

// Custom types
import {SelectionScreenProps, TrialScreenProps} from '../types/typing';
import {DisplayType} from '../types/typing';

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
export function display(
    type: DisplayType,
    target: HTMLElement,
    props: TrialScreenProps |
        SelectionScreenProps |
        Record<string, unknown>,
    timeout=0,
    callback=() => {
      consola.info('No callback defined for timeout');
    },
): void {
  render(
      <Switcher
        display={type}
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
