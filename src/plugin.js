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

    // end trial
    jsPsych.finishTrial(trialData);
  };

  return plugin;
})();
