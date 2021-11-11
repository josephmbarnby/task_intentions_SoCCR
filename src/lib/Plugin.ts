import 'jspsych/jspsych';
import consola from 'consola';

// Make TypeScript happy by declaring jsPsych
declare const jsPsych: any;

// Core modules
import {spreadsheet} from '../data';
import {config} from '../config';
import {displayScreen} from './graphics/Functions';

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
      selectionOption: -1,
      rt: 0,
      avatar: -1,
    };

    consola.info(`Running trial stage '${trial.stage}'`);

    // Load the avatar that was selected
    const _previousData = jsPsych.data.getLastTrialData().last().values()[0];
    trialData.avatar = _previousData.avatar;

    // Present a different screen based on the stage of the trial
    if (trial.stage === 'trial') {
      // Sum the number of points
      const _participantPoints =
          jsPsych.data.get().select('playerPoints').sum();
      displayScreen('trial', displayElement, {
        rowData: spreadsheet.rows[trial.row],
        avatar: trialData.avatar,
        points: _participantPoints,
        callback: choiceSelectionHandler,
      });
    } else if (trial.stage === 'selection') {
      displayScreen('selection', displayElement, {
        avatarSelectionHandler: avatarSelectionHandler,
      });
    } else if (trial.stage === 'matching') {
      displayScreen('matching', displayElement, {});
      setTimeout(() => {
        continueAfterMatch();
      }, 2000);
      // Set a timeout to move on
    } else if (trial.stage === 'matched') {
      displayScreen('matched', displayElement, {});
      setTimeout(() => {
        continueAfterMatch();
      }, 2000);
      // Set a timeout to move on
    } else {
      // Log an error message and finish the trial
      consola.error(`Unknown trial stage '${trial.stage}'`);
      jsPsych.finishTrial({});
    }

    /**
     * Handle Button-press events in a particular trial
     * @param {string} _option selected option
     */
    function choiceSelectionHandler(_option: string) {
      const _endTime = performance.now();
      const _duration = _endTime - _startTime;
      trialData.rt = _duration;

      if (_option === 'optionOne') {
        // Participant chose option 1
        trialData.selectionOption = 1;

        // Update the score with values of option 1
        trialData.playerPoints = spreadsheet.rows[trial.row]['Option1_PPT'];
        trialData.partnerPoints =
            spreadsheet.rows[trial.row]['Option1_Partner'];
      } else if (_option === 'optionTwo') {
        // Participant chose option 2
        trialData.selectionOption = 2;

        // Update the score with values of option 2
        trialData.playerPoints = spreadsheet.rows[trial.row]['Option2_PPT'];
        trialData.partnerPoints =
            spreadsheet.rows[trial.row]['Option2_Partner'];
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
    function continueAfterMatch(): void {
      jsPsych.finishTrial(trialData);
    }
  };

  return plugin;
})();
