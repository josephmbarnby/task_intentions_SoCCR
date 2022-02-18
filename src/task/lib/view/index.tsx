// React import
import React from 'react';
import ReactDOM, {render} from 'react-dom';

// Foundational 'Layout' component
import {Layout} from './components/Layout';

/**
 * Static 'View' class used to display React-based screens
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
   * @param {GeneratedPropValues} propData collection of props
   * @param {HTMLElement} target target DOM element
   */
  public display(
      type: Display,
      propData: GeneratedPropValues,
      target: HTMLElement,
  ): void {
    // Render the 'Layout' component
    render(
        <Layout
          display={type}
          screen={propData.props}
        />,
        target,
    );

    // Setup a timeout to execute the callback
    if (propData.duration > 0) {
      setTimeout(() => {
        propData.callback();
      }, propData.duration);
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
