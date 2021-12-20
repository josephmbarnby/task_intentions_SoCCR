// React import
import React, {ReactElement, JSXElementConstructor} from 'react';
import {render} from 'react-dom';
import ReactDOMServer from 'react-dom/server';

// Screen component
import Switcher from './Switcher';

// Other imports
import consola from 'consola';

/**
 * Utility function to turn React elements into HTML markup,
 * useful when HTML is required
 * @param {ReactElement} element React element to render
 * @return {string}
 */
export function markup(
    element: ReactElement<any, string | JSXElementConstructor<any>>
): string {
  const generated = ReactDOMServer.renderToStaticMarkup(element);
  return generated;
}


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
