import 'jspsych/jspsych';

// Make TypeScript happy by declaring jsPsych
declare const jsPsych: any;

// Core modules
import {spreadsheet} from '../data';
import {config} from '../config';
import {displayScreen} from './graphics/Screen';

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

    // Setup data storage
    const trialData = {
      playerPoints: 0,
      partnerPoints: 0,
      selectionOption: -1,
      rt: 0,
      avatar: -1,
    };
    console.debug(`Running trial stage '${trial.stage}'`);

    // Load the avatar that was selected
    // (will default to '-1' if not selected yet)
    const _previousData = jsPsych.data.getLastTrialData().last().values()[0];
    trialData.avatar = _previousData.avatar;

    // Present a different screen based on the stage of the trial
    if (trial.stage === 'choice') {
      // Sum the number of points
      const _participantPoints =
          jsPsych.data.get().select('playerPoints').sum();
      displayScreen('choice', displayElement, {
        rowData: spreadsheet.rows[trial.row],
        avatar: trialData.avatar,
        points: _participantPoints,
        buttonHandler: choiceSelectionHandler,
      });
    } else if (trial.stage === 'avatarSelection') {
      displayScreen('avatarSelection', displayElement, {
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

      // Trigger transition screen
      displayScreen('transition', displayElement, {});

      // End trial
      jsPsych.finishTrial(trialData);
    }

    /**
     * Handler called after avatar selected
     * @param {string} _selection avatar selection key
     */
    function avatarSelectionHandler(_selection: string): void {
      // Obtain the selected avatar
      const _avatarSelection = _selection.split(' ');
      trialData.avatar = parseInt(_avatarSelection[1]);

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
