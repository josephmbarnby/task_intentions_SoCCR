// Logging library
import consola from 'consola';

// React imports
import {ReactElement} from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

/**
 * Clear the HTML contents of an element without
 * editing innerHTML.
 * @param {HTMLElement} target element to clear contents
 * @param {boolean} isReact specify if additiona clearing
 * is required for React content
 */
export function clear(target: HTMLElement | null, isReact = false): void {
  if (target) {
    consola.debug(`Target is not null, clearing...`);
    if (isReact) {
      consola.debug(`React-based target, unmounting...`);
      ReactDOM.unmountComponentAtNode(target);
    }

    // Clear existing HTML nodes
    while (target.firstChild) {
      target.removeChild(target.lastChild as Node);
    }
    consola.debug(`Cleared HTML nodes from target`);
  } else {
    consola.warn(`Target was not cleared, target not found`);
  }
}

/**
 * Calculate the points gained from a phase
 * @param {Display} display phase to calculate points from
 * @param {string} column named column containing points
 * @return {number}
 */
export const calculatePoints = (display: Display, column: string): number => {
  let points = 0;

  if (display === 'playerGuess') {
    // `playerGuess` phases calculated differently
    const dataCollection = jsPsych.data.get()
        .filter({
          display: display,
        })
        .values();

    // Iterate through the data collection
    for (const row of dataCollection) {
      const realAnswer = row.realAnswer;
      // Determine if for the player or the partner
      if (column.startsWith('player')) {
        // Points for the player, sum partner points
        if (realAnswer === 'Option 1') {
          // Option 1
          points += row.partnerPoints_option1;
        } else {
          // Option 2
          points += row.partnerPoints_option2;
        }
      } else {
        // Points for the partner, sum player points
        if (realAnswer === 'Option 1') {
          // Option 1
          points += row.playerPoints_option1;
        } else {
          // Option 2
          points += row.playerPoints_option2;
        }
      }
    }
  } else {
    // All other phases can be calculated normally
    points = jsPsych.data.get()
        .filter({
          display: display,
        })
        .select(column)
        .sum();
  }
  return points;
};

/**
 * Utility function to turn React elements into HTML markup,
 * useful when HTML is required
 * @param {ReactElement} element React element to render
 * @return {string}
 */
export const react2html = (element: ReactElement): string => {
  return ReactDOMServer.renderToStaticMarkup(element);
};
