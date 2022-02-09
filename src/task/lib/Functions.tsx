// React import
import React, {ReactElement} from 'react';
import {render} from 'react-dom';
import ReactDOMServer from 'react-dom/server';

// Layout component
import Layout from './view/components/Layout';

// Other imports
import consola from 'consola';

/**
 * Utility function to turn React elements into HTML markup,
 * useful when HTML is required
 * @param {ReactElement} element React element to render
 * @return {string}
 */
export function markup(element: ReactElement): string {
  return ReactDOMServer.renderToStaticMarkup(element);
}

/**
 * Switch between different screens
 * @param {Display} type screen type
 * @param {any} props collection of props
 * @param {HTMLElement} target target DOM element
 * @param {number} timeout duration
 * @param {Function} callback function to run
 */
export function showDisplay(
    type: Display,
    props:
        Screens.Agency | Screens.Classification |
        Screens.Inference | Screens.Matched | Screens.Matching |
        Screens.SelectAvatar | Screens.Trial | Screens.End,
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
 * Calculate the points gained from a phase
 * @param {Display} display phase to calculate points from
 * @param {string} column named column containing points
 * @return {number}
 */
export function calculatePoints(display: Display, column: string): number {
  let points = 0;

  if (display === 'playerGuess') {
    // `playerGuess` phased calculated differently
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
    points = jsPsych.data.get()
        .filter({
          display: display,
        })
        .select(column)
        .sum();
  }
  return points;
}
