import * as spreadsheetData from "./spreadsheet.data";
import {ChoiceScreen} from "./lib";

// Configure jsPsych window variable
declare global {
  interface Window {
    jsPsych: any;
  }
}

window.jsPsych.plugins['intentions-game'] = (function() {
  const plugin = {
    info: {},
    trial: function(displayElement: any, trial: any) {},
  };

  plugin.info = {
    name: 'intentions-game',
    parameters: {
      row: {
        type: window.jsPsych.plugins.parameterType.INT,
        pretty_name: 'Spreadsheet row',
        default: undefined,
        description: 'The row to extract spreadsheet data from.',
      },
    },
  };

  plugin.trial = function(displayElement: any, trial: any) {
    // Setup data storage
    const trialData = {
      playerPoints: 0,
      partnerPoints: 0,
      selectionOption: -1,
      selectionDuration: -1,
    };

    // Retrieve the data from the spreadsheet
    const data = spreadsheetData.default.spreadsheet.rows[trial.row];

    // Instantiate classes
    const choiceScreen = new ChoiceScreen(displayElement);

    choiceScreen.display(data);
    choiceScreen.link(choiceHandler);

    // Start timing
    const _startTime = performance.now();

    /**
     * Handle Button-press events in a particular trial
     * @param {object} event information pertaining to the event
     */
    function choiceHandler(event) {
      const _endTime = performance.now();
      const _duration = _endTime - _startTime;
      trialData.selectionDuration = _duration;

      if (event.buttonId.startsWith('optionOne')) {
        // Participant chose option 1
        trialData.selectionOption = 1;

        // Update the score with values of option 1
        trialData.playerPoints += data['Option1_PPT'];
        trialData.partnerPoints += data['Option1_Partner'];
      } else if (event.buttonId.startsWith('optionTwo')) {
        // Participant chose option 2
        trialData.selectionOption = 2;

        // Update the score with values of option 2
        trialData.playerPoints += data['Option2_PPT'];
        trialData.partnerPoints += data['Option2_Partner'];
      }

      // Clear the graphics
      choiceScreen.finish();

      // End trial
      console.debug('Finished trial:', trialData);
      window.jsPsych.finishTrial(trialData);
    }
  };

  return plugin;
})();
