import 'jspsych/jspsych'

// Make TypeScript happy by declaring jsPsych
declare var jsPsych: any;

// Stylesheets
import 'jspsych/css/jspsych.css'
import './css/styles.css'

import {spreadsheet} from "./spreadsheet.data";
import {ChoiceScreen, MatchScreen, TrialDataManager} from "./lib";
import {config} from "./config";

jsPsych.plugins['intentions-game'] = (function() {
  const plugin = {
    info: {},
    trial: function(displayElement: HTMLElement, trial: any) {},
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
        description: 'The type of trial screen to display'
      }
    },
  };

  plugin.trial = function(displayElement: HTMLElement, trial: any) {
    // Present a different screen based on the stage of the trial
    if (trial.stage === 'choice') {
      trialChoice(displayElement, trial);
    } else if (trial.stage === 'match') {
      trialMatching(displayElement, trial);
    } else {
      // Log an error message and finish the trial
      console.error(`Unknown trial stage '${trial.stage}'.`);
      jsPsych.finishTrial({});
    }
  };

  function trialChoice(displayElement: HTMLElement, trial: any) {
    // Setup data storage
    const trialData = {
      playerPoints: 0,
      partnerPoints: 0,
      playerSelection: -1,
      partnerSelection: -1,
      rt: 0,
    };

    // Retrieve the data from the spreadsheet
    const data = spreadsheet.rows[trial.row];

    // Instantiate data listeners
    const dataManager = new TrialDataManager(trialData, {
      mouse: true,
      keypress: true,
    })

    // Instantiate classes
    const choiceScreen = new ChoiceScreen(displayElement);

    choiceScreen.display(data);
    choiceScreen.link(choiceHandler);

    // Start timing
    const _startTime = performance.now();
    
    // Start data collection
    dataManager.start()

    /**
     * Handle Button-press events in a particular trial
     * @param {any} event information pertaining to the event
     */
    function choiceHandler(event: any) {
      const _endTime = performance.now();
      const _duration = _endTime - _startTime;
      dataManager.setField('rt', _duration)

      if (event.buttonId.startsWith('optionOne')) {
        // Participant chose option 1
        dataManager.setField('selectionOption', 1)

        // Update the score with values of option 1
        dataManager.setField('playerPoints', data['Option1_PPT'])
        dataManager.setField('partnerPoints', data['Option1_Partner'])
      } else if (event.buttonId.startsWith('optionTwo')) {
        // Participant chose option 2
        dataManager.setField('selectionOption', 2)

        // Update the score with values of option 2
        dataManager.setField('playerPoints', data['Option2_PPT'])
        dataManager.setField('partnerPoints', data['Option2_Partner'])
      }

      // Clear the graphics
      choiceScreen.finish();

      // End trial
      jsPsych.finishTrial(dataManager.export());
    }
  }

  function trialMatching(displayElement: HTMLElement, trial: any) {
    // Instantiate classes
    const matchScreen = new MatchScreen(displayElement);

    // Display the matching screen and animation
    matchScreen.display({
      stage: 'matching',
    });

    // Set a timer to display the matched screen
    setTimeout(_updateMatched, 3000)

    function _continue() {
      matchScreen.finish()
      jsPsych.finishTrial({});
    }

    function _updateMatched() {
      // Display the matched screen and avatar
      matchScreen.display({
        stage: 'matched',
      });

      // Link the 'Continue' button
      matchScreen.link(_continue)
    }
  }

  return plugin;
})();
