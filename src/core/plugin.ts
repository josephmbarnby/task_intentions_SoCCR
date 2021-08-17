import 'jspsych/jspsych';

// Make TypeScript happy by declaring jsPsych
declare const jsPsych: any;

// Core modules
import {spreadsheet} from '../data';
import {config} from '../config';
import { displayScreen, } from './graphics/screens';

jsPsych.plugins['intentions-game'] = (function() {
  const plugin = {
    info: {},
    trial: (displayElement: HTMLElement, trial: any) => {
      console.error(`Not implemented.`);
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

    console.debug(`Running React through displayElement `, displayElement);

    // Setup data storage
    const trialData = {
      playerPoints: 0,
      partnerPoints: 0,
      selectionOption: -1,
      rt: 0,
      avatar: -1,
    };
    console.debug(`Running trial stage '${trial.stage}'`);

    // Present a different screen based on the stage of the trial
    if (trial.stage === 'choice') {
      // Get the selected avatar from the previous trial
      const _previousData = jsPsych.data.getLastTrialData().last().values()[0];
      displayScreen('choice', displayElement, {
          rowData: spreadsheet.rows[trial.row],
          avatar: _previousData.avatar,
          buttonHandler: choiceSelectionHandler,
        }
      );
    } else if (trial.stage === 'avatarSelection') {
      displayScreen('avatarSelection', displayElement, {
        avatarSelectionHandler: avatarSelectionHandler
      });
    } else if (trial.stage === 'match') {
      displayScreen('match', displayElement, {});
      // Set a timeout to move on
    } else {
      // Log an error message and finish the trial
      console.error(`Unknown trial stage '${trial.stage}'`);
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
        trialData.partnerPoints = spreadsheet.rows[trial.row]['Option1_Partner'];
      } else if (_option === 'optionTwo') {
        // Participant chose option 2
        trialData.selectionOption = 2;

        // Update the score with values of option 2
        trialData.playerPoints = spreadsheet.rows[trial.row]['Option2_PPT'];
        trialData.partnerPoints = spreadsheet.rows[trial.row]['Option2_Partner'];
      }

      // End trial
      jsPsych.finishTrial(trialData);
    }

    function avatarSelectionHandler(_selection: string) {
      // Obtain the selected avatar
      const _avatarSelection = _selection.split(' ')
      trialData.avatar = parseInt(_avatarSelection[1]);

      // End trial
      jsPsych.finishTrial(trialData);
    }
  };

  return plugin;
})();
