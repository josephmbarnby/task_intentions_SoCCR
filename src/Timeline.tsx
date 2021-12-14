// React
import React from 'react';

// Configuration
import {Configuration} from './Configuration';

// Import data spreadsheets
import Competitive from './data/competitive.csv';
import Individualist from './data/individualist.csv';
import Prosocial from './data/prosocial.csv';
import Test from './data/test.csv';

// Utility functions
import {markup} from './lib/Functions';

// Logging library
import consola from 'consola';

// Import crossplatform API
import {Experiment} from 'crossplatform-jspsych-wrapper';

// Import jsPsych plugins
import 'jspsych/plugins/jspsych-instructions';

// Import the custom plugin before adding it to the timeline
import './Plugin';

window.onload = () => {
  // Timeline setup
  const timeline = [];

  // Create a new Experiment instance
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
    markup(
        <>
          <h1>Intentions Game</h1>
          <h2>Instructions</h2>
          <p>
            The instructions for the task will go here.
            <hr />
            This can be multi-page, or just one page.
          </p>
        </>
    ),
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
  let dataCollection: string | any[];
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

  /*
    Game Phases:
    Phase 1: Player chooses how they will split points with their partner
    Phase 2: Player guesses how their parnter will choose to split the points
    Phase 3: Player chooses how they will split points with their partner

    Game Structure:
    - Avatar selection
    - Matching screen (Partner 1)
    - Phase 1
    - Agency test
    - Matching screen (Partner 2)
    - Phase 2
    - Evaluate partner
    - Agency test
    - Matching screen (Partner 3)
    - Phase 3
    - Agency test
  */

  // Read each row from the data collection and insert the correct
  // trial into the timeline
  for (let i = 0; i < dataCollection.length; i++) {
    // Get the row from the data
    const row = dataCollection[i] as Row;

    // Get the previous timeline element
    let previous = null;
    if (timeline.length > 0) {
      previous = timeline[timeline.length - 1];
    }

    // Check the trial type
    switch (row.display) {
      case 'mid': {
        // Break after Phase 1
        // Clear the screen after the previous trial
        if (previous.type === 'intentions-game') {
          previous.clearScreen = true;
        }

        // TODO: Add the 'agency' test

        // Add the instructions for the first break
        const firstBreakInstructions = [
          markup(
              <>
                <h1>Intentions Game</h1>
                <h2>Mid-way 1</h2>
                <p>
                  Mid-way 1
                </p>
              </>
          ),
        ];

        // Push elements to the timeline
        timeline.push({
          type: 'instructions',
          pages: firstBreakInstructions,
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
      case 'mid2': {
        if (previous.type === 'intentions-game') {
          previous.clearScreen = true;
        }

        // Add the second break instructions
        const secondBreakInstructions = [
          markup(
              <>
                <h1>Intentions Game</h1>
                <h2>Mid-way 2</h2>
                <p>
                  Mid-way 2
                </p>
              </>
          ),
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
      default: {
        // Regular trials
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
