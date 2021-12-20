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
import {markup} from './core/Functions';

// Logging library
import consola from 'consola';

// Import crossplatform API
import {Experiment} from 'crossplatform-jspsych-wrapper';

// Import jsPsych plugins
import 'jspsych/plugins/jspsych-instructions';

// Import the custom plugin before adding it to the timeline
import './Plugin';

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
        <h1>Instructions</h1>
        <h2>
          <i>Please read the instructions carefully!</i>
        </h2>
        <p>
          You will now take part in a series
          of interactions with <b>ONE</b> partner.
        </p>
        <p>
          You will be matched with your partner in a moment.
        </p>
        <p>
          You will play your partner for <b>18</b> trials.
        </p>
        <p>
          Their ID and your ID has been hidden to preserve anonymity.
        </p>
        <p>
          In each trial you will <i>choose between two options</i> that
          determine how many points you and your partner will
          receive in that trial.
        </p>
        <p>
          The total number of points you earn in this task will
          be the sum of the points you earn in each trial.
        </p>
      </>
  ),
  markup(
      <>
        <h1>Instructions</h1>
        <p>
          In this part of the task you will be choosing
          between the two options over 18 trials.
        </p>
        <p>
          In the second part of the task, you will play with
          a <b>new partner</b> for 36 trials where the new partner
          will choose between the two options.
        </p>
        <p>
          So, in one half of the task you choose the options and in
          the other half of the task your partner chooses the options.
        </p>
        <p>
          Remember that the partners you face in each half of the task
          are different people.
        </p>
        <p>
          Instructions for this second half will follow after the first part
          of this game.
        </p>
        <p>
          Your point total at the end of this task will contribute to your
          overall point total to put you in with a chance of winning a
          £10 bonus.
        </p>
        <p>
          Click 'Next &gt;' to choose an avatar before playing <b>2</b> example
          trials.
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

// Insert 2 'playerChoice' example trials
timeline.push({
  type: 'intentions-game',
  optionOneParticipant: 4,
  optionOnePartner: 4,
  optionTwoParticipant: 5,
  optionTwoPartner: 6,
  typeOne: '',
  typeTwo: '',
  display: 'playerChoiceExample',
  answer: '',
  clearScreen: false,
});

timeline.push({
  type: 'intentions-game',
  optionOneParticipant: 7,
  optionOnePartner: 3,
  optionTwoParticipant: 5,
  optionTwoPartner: 5,
  typeOne: '',
  typeTwo: '',
  display: 'playerChoiceExample',
  answer: '',
  clearScreen: true,
});

// Insert instructions to let the participant know they will
// be matched with a partner
timeline.push({
  type: 'instructions',
  pages: [
    markup(
        <>
          <h1>Instructions</h1>
          <p>You will now be matched with a partner.</p>
          <p>Press 'Next &gt;' to begin!</p>
        </>
    ),
  ],
  allow_keys: false,
  show_page_number: true,
  show_clickable_nav: true,
});

// Insert a 'match' sequence into the timeline
timeline.push({
  type: 'intentions-game',
  display: 'matching',
});

timeline.push({
  type: 'intentions-game',
  display: 'matched',
  clearScreen: true,
});

// Set and store the data colelction
let dataCollection: string | any[];
consola.info(
    `Loading '${Configuration.individual}' individual`
);

switch (Configuration.individual as Individual) {
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
        `'${Configuration.individual}'`
    );
}

/*
  Game Phases:
  Phase 1: Player chooses how they will split points with their partner
  Phase 2: Player guesses how their partner will choose to split the points
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

      // Add a summary screen
      timeline.push({
        type: 'intentions-game',
        display: 'summary',
      });

      // Agency screen
      timeline.push({
        type: 'intentions-game',
        display: 'agency',
        clearScreen: true,
      });

      // Add the instructions for the first break
      const firstBreakInstructions = [
        markup(
            <>
              <h1>Intentions Game</h1>
              <h2>Instructions</h2>
              <p>
                You have played all your trials with your first partner!
              </p>
              <p>
                Now, you will be matched with a new partner. For the next
                 set of trials, instead of you choosing how you will split
                 the points, your partner will be choosing how to split
                 the points!
              </p>
              <p>
                You need to select which option you <i>think </i>
                 your partner would have chosen.
              </p>
              <p>
                You will see if you chose correctly or not.
              </p>
              <p>
                After these trials, you will have an opportunity to evaluate
                 how you thought your partner was behaving.
              </p>
              <h3>Good luck!</h3>
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
        clearScreen: true,
      });
      break;
    }
    case 'mid2': {
      if (previous.type === 'intentions-game') {
        previous.clearScreen = true;
      }

      // Add a summary screen
      timeline.push({
        type: 'intentions-game',
        display: 'summary',
      });

      // Agency screen
      timeline.push({
        type: 'intentions-game',
        display: 'agency',
        clearScreen: true,
      });

      // Add the second break instructions
      const secondBreakInstructions = [
        markup(
            <>
              <h1>Intentions Game</h1>
              <h2>Instructions</h2>
              <p>
                You have played all your trials with your second partner!
              </p>
              <p>
                Now, you will be matched with a new partner. For the next
                 set of trials, you will get to choose how you split the points.
              </p>
              <p>
                After these trials, you will have an opportunity to evaluate
                 how you thought your partner was behaving.
              </p>
              <h3>Good luck!</h3>
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
        clearScreen: true,
      });
      break;
    }
    case 'playerGuess': {
      // 'playerGuess' trials, similar to 'playerChoice'-type trials,
      // but the returns are switched
      timeline.push({
        type: 'intentions-game',
        optionOneParticipant: row.Option1_Partner,
        optionOnePartner: row.Option1_PPT,
        optionTwoParticipant: row.Option2_Partner,
        optionTwoPartner: row.Option2_PPT,
        typeOne: row.Type1,
        typeTwo: row.Type2,
        display: row.display,
        answer: row.ANSWER,
        clearScreen: false,
      });
      break;
    }
    default: {
      // 'playerChoice' trials
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

// Add a summary screen
timeline.push({
  type: 'intentions-game',
  display: 'summary',
});

// Agency screen
timeline.push({
  type: 'intentions-game',
  display: 'agency',
});

// Inference screen
timeline.push({
  type: 'intentions-game',
  display: 'inference',
});

timeline.push({
  type: 'intentions-game',
  display: 'classification',
  clearScreen: true,
});

// Configure and start the experiment
experiment.start({
  timeline: timeline,
  show_progress_bar: true,
  show_preload_progress_bar: true,
});
