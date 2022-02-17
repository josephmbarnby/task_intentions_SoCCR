// React import
import React, {ReactElement} from 'react';
import ReactDOM, {render} from 'react-dom';
import ReactDOMServer from 'react-dom/server';

// Logging library
import consola from 'consola';

// Foundational 'Layout' component
import {Layout} from './components/Layout';

/**
 * Static 'View' used to display React-based screens
 */
class View {
  /**
   * Switch between different screens
   * @param {Display} type screen type
   * @param {any} props collection of props
   * @param {HTMLElement} target target DOM element
   * @param {number} timeout duration
   * @param {Function} callback function to run
   */
  public display(
      type: Display,
      props:
          Props.Screens.Agency | Props.Screens.Classification |
          Props.Screens.Inference | Props.Screens.Matched |
          Props.Screens.Matching | Props.Screens.SelectAvatar |
          Props.Screens.Trial | Props.Screens.End,
      target: HTMLElement,
      timeout=0,
      callback=() => {
        consola.info(`No callback defined for timeout`);
      },
  ): void {
    // Render the 'Layout' component
    render(
        <Layout
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

  /**
   * Utility function to turn React elements into HTML markup,
   * useful when HTML is required
   * @param {ReactElement} element React element to render
   * @return {string}
   */
  public react2html(element: ReactElement): string {
    return ReactDOMServer.renderToStaticMarkup(element);
  }

  /**
   * Clear the screen if currently using React
   * @param {HTMLElement} component target element to clear
   */
  public clear(component: HTMLElement): void {
    ReactDOM.unmountComponentAtNode(component);
  }
}

export default View;
