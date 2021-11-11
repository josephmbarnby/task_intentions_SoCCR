import 'jspsych/jspsych';
import consola from 'consola';

// Make TypeScript happy by declaring jsPsych
declare const jsPsych: any;

// Core modules
import {spreadsheet} from '../data';
import {config} from '../config';
import {display} from './graphics/Functions';
import {STAGES} from './Parameters';

jsPsych.plugins['intentions-game'] = (function() {
  const plugin = {
    info: {},
    trial: (displayElement: HTMLElement, trial: any) => {
      consola.error(`Not implemented.`);
    },
  };

  plugin.info = {
    name: config.name,
    parameters: {
      row: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Spreadsheet row',
        default: undefined,
        description: 'The row to extract spreadsheet data from.',
      },
      stage: {
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

    consola.info(`Running trial stage '${trial.stage}'`);

    // Load the avatar that was selected
    const _previousData = jsPsych.data.getLastTrialData().last().values()[0];
    trialData.avatar = _previousData.avatar;

    // Generate and configure props based on the stage
    let props: any;

    // Timeout information
    let timeoutDuration = 0;
    let timeoutCallback: () => void;

    switch (trial.stage) {
      // Phase one and two trials
      case STAGES.TRIAL_PHASE_ONE:
      case STAGES.TRIAL_PHASE_TWO: {
        const participantPoints =
          jsPsych.data.get().select('playerPoints').sum();
        props = {
          data: {
            optionOne: {
              participant: spreadsheet.rows[trial.row].Option1_PPT,
              partner: spreadsheet.rows[trial.row].Option1_Partner,
            },
            optionTwo: {
              participant: spreadsheet.rows[trial.row].Option2_PPT,
              partner: spreadsheet.rows[trial.row].Option2_Partner,
            },
          },
          avatar: trialData.avatar,
          points: participantPoints,
          endTrial: endTrial,
          stage: trial.stage,
        };
        break;
      }

      // Matching and matched stages
      case STAGES.MATCHED:
      case STAGES.MATCHING:
        props = {};
        timeoutDuration = 2000;
        timeoutCallback = continueTrial;
        break;

      // Selection screen
      case STAGES.SELECTION:
        props = {
          selectionHandler: avatarSelectionHandler,
        };
        break;

      // Default error state
      default:
        // Log an error message and finish the trial
        consola.error(`Unknown trial stage '${trial.stage}'`);
        jsPsych.finishTrial({});
        break;
    }

    // Display the screen with the generated props
    display(
        trial.stage,
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
        trialData.playerPoints = spreadsheet.rows[trial.row].Option1_PPT;
        trialData.partnerPoints =
            spreadsheet.rows[trial.row].Option1_Partner;
      } else if (_option === 'optionTwo') {
        // Participant chose option 2
        trialData.selectedOption = 2;

        // Update the score with values of option 2
        trialData.playerPoints = spreadsheet.rows[trial.row].Option2_PPT;
        trialData.partnerPoints =
            spreadsheet.rows[trial.row].Option2_Partner;
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
      trialData.avatar = config.avatars.indexOf(_selection);

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
