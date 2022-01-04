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
import 'jspsych-attention-check';

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
        <h2>
          Overview
        </h2>
        <p>
          You will now take part in a series
          of interactions with <b>ONE</b> partner.
        </p>
        <p>
          You will be matched with your partner in a moment.
        </p>
        <p>
          You will play your partner for <b>36</b> trials.
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
        <h2>
          Overview
        </h2>
        <p>
          In the first part of the task, <i>you</i> will be choosing
          between the two options over 36 trials.
        </p>
        <p>
          In the second part of the task, you will play with
          a <b>new partner</b> for 54 trials where <i>new
          partner</i> will choose between the two options.
        </p>
        <p>
          In the third part of the task, you will play
          with <b>another new partner</b> for 36 trials
          where <i>you</i> will be choosing between the
          two options.
        </p>
        <p>
          So, in the first part of the task you choose the options, in
          the other part of the task your partner chooses the options,
          and in the third part of the task you choose the options.
        </p>
        <h2>
          Before you continue
        </h2>
        <p>
          Remember that the partners you face in each part of the task
          are different people.
        </p>
        <p>
          Instructions for the second part will follow after the first part
          of this game.
        </p>
        <p>
          Your point total at the end of this task will contribute to your
          overall point total to put you in with a chance of winning a
          $x bonus.
        </p>
        <p>
          Click 'Next &gt;' to choose an avatar before playing <b>2</b> tutorial
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
  type: Configuration.pluginName,
  display: 'selection',
});

// Tutorial trials for 'playerChoice'
timeline.push({
  type: Configuration.pluginName,
  optionOneParticipant: 4,
  optionOnePartner: 4,
  optionTwoParticipant: 5,
  optionTwoPartner: 6,
  typeOne: '',
  typeTwo: '',
  display: 'playerChoiceTutorial',
  answer: '',
  isTutorial: true,
  clearScreen: false,
});

timeline.push({
  type: Configuration.pluginName,
  optionOneParticipant: 7,
  optionOnePartner: 3,
  optionTwoParticipant: 5,
  optionTwoPartner: 5,
  typeOne: '',
  typeTwo: '',
  display: 'playerChoiceTutorial',
  answer: '',
  isTutorial: true,
  clearScreen: true,
});

// Attention check question
timeline.push({
  type: 'attention-check',
  question: 'In this task, ' +
      'who will be choosing the points you and your partner get?',
  options: [
    'A lottery',
    'Me',
    'My partner',
  ],
  options_radio: true,
  option_correct: 1,
  confirmation: true,
  feedback_correct: 'Correct! ' +
      'You will be choosing the points you and your partner get.',
  feedback_incorrect: 'Incorrect. Please review the instructions.',
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
  type: Configuration.pluginName,
  display: 'matching',
});

timeline.push({
  type: Configuration.pluginName,
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
      // Add a summary screen
      timeline.push({
        type: Configuration.pluginName,
        display: 'summary',
      });

      // Agency screen
      timeline.push({
        type: Configuration.pluginName,
        display: 'agency',
        clearScreen: true,
      });

      // Break after Phase 1
      // Add the instructions for the first break
      const firstBreakInstructions = [
        markup(
            <>
              <h1>Intentions Game</h1>
              <h2>Instructions</h2>
              <p>
                You will now take part in a series of interactions with <i>ONE
                NEW</i> partner.
              </p>
              <p>
                You will be matched with your new partner in a moment.
              </p>
              <p>
                You will play with your partner for 36 trials.
              </p>
              <p>
                Their ID and your ID has been hidden to preserve anonymity.
              </p>
              <p>
                In each trial there are still two options available to choose
                from that will determine the amount of points you and your
                partner receive. However, in this part of the task, <b>
                you need to guess which option your partner will choose</b>.
              </p>
            </>
        ),
        markup(
            <>
              <h1>Intentions Game</h1>
              <h2>Instructions</h2>
              <p>
                Each option will increase the total points you and your partner
                have to different amounts.
              </p>
              <p>
                You will get feedback on whether the option you predicted your
                partner will choose was correct or incorrect by highlighting
                your prediction in green or red.
              </p>
              <p>
                You will get bonus points dependent on the number of correct
                answers you get in this part of the task, that is, the amount of
                times you correctly guess what your partner chose each trial.
              </p>
              <p>
                Click 'Next &gt;' to see an example of what each trial will
                look like.
              </p>
              <p>
                <b>
                  Your point total at the end of this task will contribute
                  to your overall point total to put you in with a chance of
                  winning a bonus.
                </b>
              </p>
              <h3>Good luck!</h3>
              <p>Press 'Next &gt;' to continue!</p>
            </>
        ),
      ];

      // Push instructions to the timeline
      timeline.push({
        type: 'instructions',
        pages: firstBreakInstructions,
        allow_keys: false,
        show_page_number: true,
        show_clickable_nav: true,
      });

      // Tutorial trials for 'playerGuess'
      timeline.push({
        type: Configuration.pluginName,
        optionOneParticipant: 4,
        optionOnePartner: 4,
        optionTwoParticipant: 5,
        optionTwoPartner: 6,
        typeOne: '',
        typeTwo: '',
        display: 'playerGuessTutorial',
        answer: 'Option 1',
        isTutorial: true,
        clearScreen: false,
      });

      timeline.push({
        type: Configuration.pluginName,
        optionOneParticipant: 4,
        optionOnePartner: 4,
        optionTwoParticipant: 5,
        optionTwoPartner: 6,
        typeOne: '',
        typeTwo: '',
        display: 'playerGuessTutorial',
        answer: 'Option 2',
        isTutorial: true,
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
                <p>Press 'Next &gt;' to continue!</p>
              </>
          ),
        ],
        allow_keys: false,
        show_page_number: true,
        show_clickable_nav: true,
      });

      // Insert another 'match' sequence into the timeline
      timeline.push({
        type: Configuration.pluginName,
        display: 'matching',
      });

      timeline.push({
        type: Configuration.pluginName,
        display: 'matched',
        clearScreen: true,
      });

      break;
    }
    case 'mid2': {
      if (previous.type === Configuration.pluginName) {
        previous.clearScreen = true;
      }

      // Summary screen
      timeline.push({
        type: Configuration.pluginName,
        display: 'summary',
      });

      // Inference screen
      timeline.push({
        type: Configuration.pluginName,
        display: 'inference',
      });

      // Classification screen
      timeline.push({
        type: Configuration.pluginName,
        display: 'classification',
        clearScreen: true,
      });

      // Agency screen
      timeline.push({
        type: Configuration.pluginName,
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
                Now, you will be matched with a new partner. For this final
                part, just like the first part, you will get to choose how
                you split the points.
              </p>
              <p>Press 'Next &gt;' to continue!</p>
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
        type: Configuration.pluginName,
        display: 'matching',
      });

      timeline.push({
        type: Configuration.pluginName,
        display: 'matched',
        clearScreen: true,
      });

      break;
    }
    case 'playerGuess': {
      // 'playerGuess' trials, similar to 'playerChoice'-type trials,
      // but the returns are switched
      timeline.push({
        type: Configuration.pluginName,
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
        type: Configuration.pluginName,
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
  type: Configuration.pluginName,
  display: 'summary',
});

// Agency screen
timeline.push({
  type: Configuration.pluginName,
  display: 'agency',
});

// Configure and start the experiment
experiment.start({
  timeline: timeline,
  show_progress_bar: true,
  show_preload_progress_bar: true,
});
