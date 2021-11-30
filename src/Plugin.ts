// React
import ReactDOM from 'react-dom';

// Logging library
import consola from 'consola';

// Core modules
import {Configuration} from './Configuration';
import {display} from './lib/view/Functions';

// Custom types
import {
  DisplayType,
  MatchedProps,
  MatchingProps,
  SelectAvatarProps,
  Trial,
  TrialProps,
} from './lib/types/typing';

jsPsych.plugins['intentions-game'] = (() => {
  const plugin = {
    info: {},
    trial: (displayElement: HTMLElement, trial: Trial) => {
      consola.error(`Not implemented.`);
    },
  };

  plugin.info = {
    name: Configuration.studyName,
    parameters: {
      optionOneParticipant: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Option One Participant',
        default: 0,
        description: 'Number of points for the participant in option one.',
      },
      optionOnePartner: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Option One Partner',
        default: 0,
        description: 'Number of points for the partner in option one.',
      },
      optionTwoParticipant: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Option Two Participant',
        default: 0,
        description: 'Number of points for the participant in option two.',
      },
      optionTwoPartner: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Option Two Partner',
        default: 0,
        description: 'Number of points for the partner in option two.',
      },
      typeOne: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Type One',
        default: '',
        description: 'The type of option one.',
      },
      typeTwo: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Type Two',
        default: '',
        description: 'The type of option two',
      },
      display: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Type of trial screen',
        default: undefined,
        description: 'The type of trial screen to display',
      },
      answer: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Correct answer',
        default: '',
        description: 'The correct answer to select',
      },
      isLast: {
        type: jsPsych.plugins.parameterType.BOOLEAN,
        pretty_name: 'Last trial of block',
        default: false,
        description: 'Mark the last trial of a trial block',
      },
    },
  };

  plugin.trial = function(displayElement: HTMLElement, trial: Trial) {
    // Record the starting time
    const _startTime = performance.now();

    // Setup data storage
    const trialData = {
      playerPoints: 0,
      partnerPoints: 0,
      selectedOption: -1,
      rt: 0,
      avatar: -1,
    };

    consola.info(`Running trial stage '${trial.display}'`);

    // Load the avatar that was selected at the start of the game
    const previousData = jsPsych.data.get()
        .filter({trial_type: 'intentions-game'})
        .values()[0];
    if (previousData && previousData.avatar) {
      trialData.avatar = previousData.avatar;
    }

    // Generate and configure props based on the stage
    let screenProps:
        MatchedProps | MatchingProps | TrialProps | SelectAvatarProps;

    // Timeout information
    let timeoutDuration = 0;
    let timeoutCallback: () => void;

    switch (trial.display as DisplayType) {
      // Phase one and two trials
      case 'playerChoice':
      case 'playerGuess': {
        // Sum the points from the previous trials
        const participantPoints =
          jsPsych.data.get().select('playerPoints').sum();
        const partnerPoints =
          jsPsych.data.get().select('partnerPoints').sum();

        // Setup the props
        screenProps = {
          display: trial.display,
          avatar: trialData.avatar,
          participantPoints: participantPoints,
          partnerPoints: partnerPoints,
          options: {
            one: {
              participant: trial.optionOneParticipant,
              partner: trial.optionOnePartner,
            },
            two: {
              participant: trial.optionTwoParticipant,
              partner: trial.optionTwoPartner,
            },
          },
          answer: trial.answer,
          endTrial: endTrial,
        };
        break;
      }

      // Matching and matched stages
      case 'matched':
      case 'matching':
        // Setup the props
        screenProps = {
          display: trial.display,
        };

        timeoutDuration = 2000;
        timeoutCallback = finishTrial;
        break;

      // Selection screen
      case 'selection':
        // Setup the props
        screenProps = {
          display: trial.display,
          selectionHandler: avatarSelectionHandler,
        };
        break;

      // Default error state
      default:
        // Log an error message and finish the trial
        consola.error(`Unknown trial stage '${trial.display}'`);
        finishTrial();
        break;
    }

    // Display the screen with the generated props
    display(
        trial.display,
        displayElement,
        screenProps,
        timeoutDuration,
        timeoutCallback
    );

    /**
     * Handle Button-press events in a particular trial
     * @param {'Option 1' | 'Option 2'} _option selected option
     */
    function endTrial(_option: 'Option 1' | 'Option 2') {
      const _endTime = performance.now();
      const _duration = _endTime - _startTime;
      trialData.rt = _duration;

      if (_option === 'Option 1') {
        // Participant chose option 1
        trialData.selectedOption = 1;

        // Update the score with values of option 1
        trialData.playerPoints = trial.optionOneParticipant;
        trialData.partnerPoints = trial.optionOnePartner;
      } else if (_option === 'Option 2') {
        // Participant chose option 2
        trialData.selectedOption = 2;

        // Update the score with values of option 2
        trialData.playerPoints = trial.optionTwoParticipant;
        trialData.partnerPoints = trial.optionTwoPartner;
      }

      // End trial
      finishTrial();
    }

    /**
     * Handler called after avatar selected
     * @param {string} _selection avatar selection key
     */
    function avatarSelectionHandler(_selection: string): void {
      // Obtain the selected avatar
      trialData.avatar = Configuration.avatars.indexOf(_selection);

      // End trial
      finishTrial();
    }

    /**
     * Function to continue without participant input
     * @param {boolean} reset toggle whether to reset the screen or not
     */
    function finishTrial(): void {
      // If the next trial isn't React-based, clean up React
      if (trial.isLast === true) {
        ReactDOM.unmountComponentAtNode(displayElement);
      }

      // Finish the jsPsych trial
      jsPsych.finishTrial(trialData);
    }
  };

  return plugin;
})();
