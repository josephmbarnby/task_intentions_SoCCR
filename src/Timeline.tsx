// React
import React from 'react';
import ReactDOMServer from 'react-dom/server';

// Configuration and data
import {Configuration} from './Configuration';

// Import data spreadsheets
import Competitive from './data/competitive.csv';
import Individualist from './data/individualist.csv';
import Prosocial from './data/prosocial.csv';
import Test from './data/test.csv';

// Logging library
import consola from 'consola';

// Import crossplatform API
import {Experiment} from 'crossplatform-jspsych-wrapper';

// Import jsPsych plugins
import 'jspsych/plugins/jspsych-instructions';

// Import the custom plugin before adding it to the timeline
import './Plugin';

// TODO: Clarify the overall task flow and what trials are placed where

window.onload = () => {
  // Timeline setup
  const timeline = [];
  const experiment = new Experiment(Configuration);

  // Set the experiment to run in fullscreen mode
  if (Configuration.fullscreen === true) {
    timeline.push({
      type: 'fullscreen',
      message: `<p>Click 'Continue' to enter fullscreen mode.</p>`,
      fullscreen_mode: true,
    });
  }

  const instructionsPracticeGames = [
    () => {
      return ReactDOMServer.renderToStaticMarkup(
          <>
            <h1>Intentions Game</h1>
            <h2>Instructions</h2>
            <p>
              The instructions for the task will go here.
              <hr />
              This can be multi-page, or just one page.
            </p>
          </>
      );
    },
  ];

  // Insert the instructions into the timeline
  timeline.push({
    type: 'instructions',
    pages: instructionsPracticeGames,
    allow_keys: false,
    show_page_number: true,
    show_clickable_nav: true,
  });

  // Insert a 'selection' screen into the timeline
  timeline.push({
    type: 'intentions-game',
    display: 'selection',
  });

  // Insert a 'match' sequence into the timeline
  timeline.push({
    type: 'intentions-game',
    display: 'matching',
  });

  timeline.push({
    type: 'intentions-game',
    display: 'matched',
  });

  // Set and store the data colelction
  let dataCollection;
  consola.info(
      `Loading '${Configuration.manipulations.individualType}' configuration`
  );

  switch (Configuration.manipulations.individualType as IndividualType) {
    case 'Competitive': {
      dataCollection = Competitive;
      break;
    }
    case 'Individual': {
      dataCollection = Individualist;
      break;
    }
    case 'Prosocial': {
      dataCollection = Prosocial;
      break;
    }
    case 'Test': {
      dataCollection = Test;
      break;
    }
    default:
      throw new Error(
          `Unknown individual type ` +
          `'${Configuration.manipulations.individualType}'`
      );
  }

  // Insert the 'choice' screens into the timeline
  for (let i = 0; i < dataCollection.length; i++) {
    // Get the row data
    const row = dataCollection[i] as Row;

    // Check the trial type
    switch (row.display) {
      case 'mid': {
        // Get the last trial
        const lastTrial = timeline[timeline.length - 1];
        if (lastTrial.type === 'intentions-game') {
          lastTrial.clearScreen = true;
        }

        // Add the first break instructions
        const firstBreakInstructions = [
          () => {
            return ReactDOMServer.renderToStaticMarkup(
                <>
                  <h1>Intentions Game</h1>
                  <h2>Mid-way 1</h2>
                  <p>
                    Mid-way 1
                  </p>
                </>
            );
          },
        ];

        timeline.push({
          type: 'instructions',
          pages: firstBreakInstructions,
          allow_keys: false,
          show_page_number: true,
          show_clickable_nav: true,
        });
        break;
      }
      case 'mid2': {
        // Get the last trial
        const lastTrial = timeline[timeline.length - 1];
        if (lastTrial.type === 'intentions-game') {
          lastTrial.clearScreen = true;
        }

        // Add the second break instructions
        const secondBreakInstructions = [
          () => {
            return ReactDOMServer.renderToStaticMarkup(
                <>
                  <h1>Intentions Game</h1>
                  <h2>Mid-way 2</h2>
                  <p>
                    Mid-way 2
                  </p>
                </>
            );
          },
        ];

        timeline.push({
          type: 'instructions',
          pages: secondBreakInstructions,
          allow_keys: false,
          show_page_number: true,
          show_clickable_nav: true,
        });

        // Insert another 'match' sequence into the timeline
        timeline.push({
          type: 'intentions-game',
          display: 'matching',
        });

        timeline.push({
          type: 'intentions-game',
          display: 'matched',
        });
        break;
      }
      case 'playerChoice2': {
        // Identical to ordinary trials, except the screen
        // is cleared after each trial
        timeline.push({
          type: 'intentions-game',
          optionOneParticipant: row.Option1_PPT,
          optionOnePartner: row.Option1_Partner,
          optionTwoParticipant: row.Option2_PPT,
          optionTwoPartner: row.Option2_Partner,
          typeOne: row.Type1,
          typeTwo: row.Type2,
          display: row.display,
          answer: row.ANSWER,
          clearScreen: true,
        });
        break;
      }
      default: {
        timeline.push({
          type: 'intentions-game',
          optionOneParticipant: row.Option1_PPT,
          optionOnePartner: row.Option1_Partner,
          optionTwoParticipant: row.Option2_PPT,
          optionTwoPartner: row.Option2_Partner,
          typeOne: row.Type1,
          typeTwo: row.Type2,
          display: row.display,
          answer: row.ANSWER,
          clearScreen: false,
        });
        break;
      }
    }
  }

  // Configure and start the experiment
  experiment.start({
    timeline: timeline,
    show_progress_bar: true,
    show_preload_progress_bar: true,
  });
};
