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

    console.debug(`Start plugin.`);

    // Instantiate classes
    const choiceScreen = new ChoiceScreen(displayElement);
    choiceScreen.getGraphics().addButton(
        'Test Button',
        displayElement,
        'Button1',
        choiceHandler,
    );

    /**
     * Handle Button-press events in a particular trial
     * @param {object} event information pertaining to the event
     */
    function choiceHandler(event) {
      console.debug(`Event message: ${event.message}`);

      // End trial
      jsPsych.finishTrial(trialData);
    }
  };

  return plugin;
})();
