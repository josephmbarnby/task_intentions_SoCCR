// React import
import React from 'react';
import ReactDOM, {render} from 'react-dom';

// Logging library
import consola from 'consola';

// Foundational 'Layout' component
import {Layout} from './components/Layout';

/**
 * Static 'View' used to display React-based screens
 */
class View {
  private target: HTMLElement;

  /**
   * Default constructor
   * @param {HTMLElement} target the target HTML element
   */
  constructor(target: HTMLElement) {
    this.target = target;
  }

  /**
   * Get the target HTML element
   * @return {HTMLElement}
   */
  public getTarget(): HTMLElement {
    return this.target;
  }

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
   * Clear the screen if currently using React
   */
  public clear(): void {
    ReactDOM.unmountComponentAtNode(this.target);
  }
}

export default View;
