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
    console.debug(`Loaded data from spreadsheet for row '${trial.row}'.`);
    console.debug(data);

    console.debug(`Trial started`);

    // Instantiate classes
    const choiceScreen = new ChoiceScreen(displayElement);

    choiceScreen.display(data);
    choiceScreen.link(choiceHandler);
    console.debug(`Completed display`);

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

      console.debug(`Event '${event.type}' at time ${event.timeStamp}`);
      console.debug(`Button pressed: ${event.buttonId}`);
      if (event.buttonId.startsWith('optionOne')) {
        // Participant chose option 1
        console.debug(`Selected option 1 in ${_duration}ms.`);
        trialData.selectionOption = 1;

        // Update the score with values of option 1
        trialData.playerPoints += data['Option1_PPT'];
        trialData.partnerPoints += data['Option1_Partner'];
      } else if (event.buttonId.startsWith('optionTwo')) {
        // Participant chose option 2
        console.debug(`Selected option 2 in ${_duration}ms.`);
        trialData.selectionOption = 2;

        // Update the score with values of option 2
        trialData.playerPoints += data['Option2_PPT'];
        trialData.partnerPoints += data['Option2_Partner'];
      }

      console.debug(trialData);

      // End trial
      window.jsPsych.finishTrial(trialData);
    }
  };

  return plugin;
})();
