jsPsych.plugins['intentions-game'] = (function() {
  const plugin = {};

  plugin.info = {
    name: 'intentions-game',
    parameters: {},
  };

  plugin.trial = function(displayElement, trial) {
    // data saving
    const trialData = {
      name: 'parameter value',
    };

    console.debug(`Start plugin.`);

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
