// React import
import React from 'react';
import {render} from 'react-dom';

// Screen component
import Switcher from './Switcher';

// Other imports
import consola from 'consola';

/**
 * Switch between different screens
 * @param {Display} type screen type
 * @param {HTMLElement} target target DOM element
 * @param {any} props collection of props
 * @param {number} timeout duration
 * @param {Function} callback function to run
 */
export function display(
    type: Display,
    target: HTMLElement,
    props:
        Screens.Agency | Screens.Classification |
        Screens.Inference | Screens.Matched | Screens.Matching |
        Screens.SelectAvatar | Screens.Trial,
    timeout=0,
    callback=() => {
      consola.info('No callback defined for timeout');
    },
): void {
  // Render the Switcher
  render(
      <Switcher
        display={type}
        screen={props}
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
