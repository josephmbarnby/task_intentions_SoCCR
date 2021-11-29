import 'jspsych/jspsych';
import consola from 'consola';

// Make TypeScript happy by declaring jsPsych
declare const jsPsych: any;

// Core modules
import {Configuration} from '../Configuration';
import {display} from './view/Functions';
import {STAGES} from './Parameters';

// Custom types
import {DisplayType} from '../types/data';
import {SelectionScreenProps, TrialScreenProps} from '../types/screens';

jsPsych.plugins['intentions-game'] = (function() {
  const plugin = {
    info: {},
    trial: (displayElement: HTMLElement, trial: any) => {
      consola.error(`Not implemented.`);
    },
  };

  plugin.info = {
    name: Configuration.name,
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
    },
  };

  plugin.trial = function(displayElement: HTMLElement, trial: any) {
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

    // Load the avatar that was selected
    const _previousData = jsPsych.data.getLastTrialData().last().values()[0];
    trialData.avatar = _previousData.avatar;

    // Generate and configure props based on the stage
    let props:
      TrialScreenProps |
      SelectionScreenProps |
      Record<string, unknown>;

    // Timeout information
    let timeoutDuration = 0;
    let timeoutCallback: () => void;

    switch (trial.display as DisplayType) {
      // Phase one and two trials
      case 'playerChoice':
      case 'playerGuess': {
        const participantPoints =
          jsPsych.data.get().select('playerPoints').sum();
        props = {
          data: {
            optionOne: {
              participant: trial.optionOneParticipant,
              partner: trial.optionOnePartner,
            },
            optionTwo: {
              participant: trial.optionTwoParticipant,
              partner: trial.optionTwoPartner,
            },
          },
          avatar: trialData.avatar,
          points: participantPoints,
          endTrial: endTrial,
          display: trial.display,
        };
        break;
      }

      // Matching and matched stages
      case 'matched':
      case 'matching':
        props = {};
        timeoutDuration = 2000;
        timeoutCallback = continueTrial;
        break;

      // Selection screen
      case 'selection':
        props = {
          selectionHandler: avatarSelectionHandler,
        };
        break;

      // Default error state
      default:
        // Log an error message and finish the trial
        consola.error(`Unknown trial stage '${trial.display}'`);
        jsPsych.finishTrial({});
        break;
    }

    // Display the screen with the generated props
    display(
        trial.display,
        displayElement,
        props,
        timeoutDuration,
        timeoutCallback
    );

    /**
     * Handle Button-press events in a particular trial
     * @param {string} _option selected option
     */
    function endTrial(_option: string) {
      const _endTime = performance.now();
      const _duration = _endTime - _startTime;
      trialData.rt = _duration;

      if (_option === 'optionOne') {
        // Participant chose option 1
        trialData.selectedOption = 1;

        // Update the score with values of option 1
        trialData.playerPoints = trial.optionOneParticipant;
        trialData.partnerPoints = trial.optionOnePartner;
      } else if (_option === 'optionTwo') {
        // Participant chose option 2
        trialData.selectedOption = 2;

        // Update the score with values of option 2
        trialData.playerPoints = trial.optionTwoParticipant;
        trialData.partnerPoints = trial.optionTwoPartner;
      }

      // End trial
      jsPsych.finishTrial(trialData);
    }

    /**
     * Handler called after avatar selected
     * @param {string} _selection avatar selection key
     */
    function avatarSelectionHandler(_selection: string): void {
      // Obtain the selected avatar
      trialData.avatar = Configuration.avatars.indexOf(_selection);

      // End trial
      jsPsych.finishTrial(trialData);
    }

    /**
     * Function to continue without participant input
     */
    function continueTrial(): void {
      jsPsych.finishTrial(trialData);
    }
  };

  return plugin;
})();
