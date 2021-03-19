jsPsych.plugins['intentions-game'] = (function() {
  const plugin = {};

  plugin.info = {
    name: 'intentions-game',
    parameters: {},
  };

  plugin.trial = function(displayElement, trial) {
    // Setup data storage
    const trialData = {
      name: 'parameter value',
    };

    console.debug(`Trial started`);

    // Instantiate classes
    const choiceScreen = new ChoiceScreen(displayElement);

    choiceScreen.display();
    choiceScreen.link(choiceHandler);
    console.debug(`Completed display`);

    /**
     * Handle Button-press events in a particular trial
     * @param {object} event information pertaining to the event
     */
    function choiceHandler(event) {
      console.debug(`Event '${event.type}' at time ${event.timeStamp}`);

      // End trial
      jsPsych.finishTrial(trialData);
    }
  };

  return plugin;
})();
