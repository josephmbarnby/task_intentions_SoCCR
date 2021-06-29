<<<<<<< Updated upstream
import {spreadsheet} from "./spreadsheet.data";
import {ChoiceScreen, MatchScreen} from "./lib";
import {config} from "./config";
=======
import * as spreadsheetData from "./spreadsheet.data";
import {ChoiceScreen, TrialDataManager} from "./lib";
>>>>>>> Stashed changes

// Configure jsPsych window variable
declare var jsPsych: any;

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
<<<<<<< Updated upstream
      playerSelection: -1,
      partnerSelection: -1,
      rt: 0,
=======
      selectionOption: -1,
      selectionReactionTime: -1,
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      trialData.rt = _duration;

      if (event.buttonId.startsWith('optionOne')) {
        // Participant chose option 1
        trialData.playerSelection = 1;
=======
      dataManager.setField('selectionReactionTime', _duration)

      if (event.buttonId.startsWith('optionOne')) {
        // Participant chose option 1
        dataManager.setField('selectionOption', 1)
>>>>>>> Stashed changes

        // Update the score with values of option 1
        dataManager.setField('playerPoints', data['Option1_PPT'])
        dataManager.setField('partnerPoints', data['Option1_Partner'])
      } else if (event.buttonId.startsWith('optionTwo')) {
        // Participant chose option 2
<<<<<<< Updated upstream
        trialData.playerSelection = 2;
=======
        dataManager.setField('selectionOption', 2)
>>>>>>> Stashed changes

        // Update the score with values of option 2
        dataManager.setField('playerPoints', data['Option2_PPT'])
        dataManager.setField('partnerPoints', data['Option2_Partner'])
      }

      // Clear the graphics
      choiceScreen.finish();

      // End trial
<<<<<<< Updated upstream
      console.debug('Finished trial:', trialData);
      jsPsych.finishTrial(trialData);
=======
      console.debug('Finished trial:', dataManager.export());
      window.jsPsych.finishTrial(dataManager.export());
>>>>>>> Stashed changes
    }
  }

  function trialMatching(displayElement: HTMLElement, trial: any) {
    // Instantiate classes
    const matchScreen = new MatchScreen(displayElement);

    matchScreen.display({});
  }

  return plugin;
})();
