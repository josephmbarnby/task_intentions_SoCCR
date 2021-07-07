import 'jspsych/jspsych';
import ReactDOM from 'react-dom'

// Make TypeScript happy by declaring jsPsych
declare const jsPsych: any;

// Stylesheets
import 'jspsych/css/jspsych.css';
import 'spin.js/spin.css';
import '../css/styles.css';

// Core modules
import {spreadsheet} from '../data';
import {ChoiceScreen, MatchScreen, TrialDataManager} from './lib';
import {config} from '../config';
import { AvatarSelectionScreen, ChoicesScreen, ScreenLayout } from './graphics/screens';

jsPsych.plugins['intentions-game'] = (function() {
  const plugin = {
    info: {},
    trial: (displayElement: HTMLElement, trial: any) => {
      console.error(`Trial not implemented correctly.`);
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
    };

    // Present a different screen based on the stage of the trial
    if (trial.stage === 'choice') {
      ReactDOM.render(
        ScreenLayout({
          screen: ChoicesScreen({
            rowData: spreadsheet.rows[trial.row],
            buttonHandler: choiceSelectionHandler,
          })
        }),
        displayElement
      );

      // trialChoice(displayElement, trial);
    } else if (trial.stage === 'match') {
      ReactDOM.render(
        ScreenLayout({
          screen: AvatarSelectionScreen()
        }),
        displayElement
      );
      // trialMatching(displayElement, trial);
    } else {
      // Log an error message and finish the trial
      console.error(`Unknown trial stage '${trial.stage}'.`);
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
  };
  

  /**
   * Run a 'match' type trial
   * @param {HTMLElement} displayElement target HTML element
   * @param {any} trial jsPsych trial data
   */
  function trialMatching(displayElement: HTMLElement, trial: any) {
    // Instantiate classes
    const matchScreen = new MatchScreen(displayElement);

    // Display the matching screen and animation
    matchScreen.display({
      stage: 'matching',
    });

    // Set a timer to display the matched screen
    setTimeout(_updateMatched, 3000);

    /**
     * Event function to continue
     */
    function _continue() {
      matchScreen.finish();
      jsPsych.finishTrial({});
    }

    /**
     * Event function called to update display
     */
    function _updateMatched() {
      // Display the matched screen and avatar
      matchScreen.display({
        stage: 'matched',
      });

      // Link the 'Continue' button
      matchScreen.link(_continue);
    }
  }

  return plugin;
})();
