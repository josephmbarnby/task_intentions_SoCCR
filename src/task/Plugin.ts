// Logging library
import consola from 'consola';

// Core modules
import {Configuration} from './lib/configuration';
import PropFactory from './lib/classes/factories/PropFactory';
import View from './lib/view';

jsPsych.plugins[Configuration.studyName] = (() => {
  const plugin = {
    info: {},
    trial: (displayElement: HTMLElement, trial: Trial) => {
      // Debugging info if this is reached
      consola.debug(`displayElement:`, displayElement);
      consola.debug(`trial:`, trial);

      // Should raise an error
      consola.error(`Not implemented.`);
    },
  };

  plugin.info = {
    name: Configuration.studyName,
    parameters: {
      optionOneParticipant: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Option One Participant',
        default: 0,
        description: 'Number of points for the participant in option one.',
      },
      optionOnePartner: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Option One Partner',
        default: 0,
        description: 'Number of points for the partner in option one.',
      },
      optionTwoParticipant: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Option Two Participant',
        default: 0,
        description: 'Number of points for the participant in option two.',
      },
      optionTwoPartner: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Option Two Partner',
        default: 0,
        description: 'Number of points for the partner in option two.',
      },
      typeOne: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Type One',
        default: '',
        description: 'The type of option one.',
      },
      typeTwo: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Type Two',
        default: '',
        description: 'The type of option two',
      },
      display: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Type of trial screen',
        default: undefined,
        description: 'The type of trial screen to display',
      },
      answer: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Correct answer',
        default: '',
        description: 'The correct answer to select',
      },
      isPractice: {
        type: jsPsych.plugins.parameterType.BOOLEAN,
        pretty_name: 'Trial is a practice trial',
        default: false,
        description: 'Show feedback to participants',
      },
      fetchData: {
        type: jsPsych.plugins.parameterType.BOOLEAN,
        pretty_name: 'Enable or disable server queries',
        default: false,
        description: 'Used primarily in the \'Matching\' screen',
      },
      clearScreen: {
        type: jsPsych.plugins.parameterType.BOOLEAN,
        pretty_name: 'Clear after trial',
        default: false,
        description: 'Clear the screen after this trial',
      },
    },
  };

  plugin.trial = (displayElement: HTMLElement, trial: Trial) => {
    // Setup the trial data to be stored
    const dataframe: Data = {
      trial: trial.trial,
      display: trial.display, // the display type
      playerPoints_option1: trial.optionOneParticipant,
      partnerPoints_option1: trial.optionOnePartner,
      playerPoints_option2: trial.optionTwoParticipant,
      partnerPoints_option2: trial.optionTwoPartner,
      playerPoints_selected: 0,
      partnerPoints_selected: 0,
      selectedOption_player: -1, // option selected by participant
      realAnswer: trial.answer,
      correctGuess: -1, // whether or not the participant guessed correctly
      inferenceResponse_Selfish: -1.0,
      inferenceResponse_Harm: -1.0,
      agencyResponse: -1.0, // float response to agency question
      classification: '', // classification string selected by participant
      trialDuration: 0, // duration of the trial in ms
    };

    // Debug statement
    consola.debug(`Running trial stage '${trial.display}'`);

    // Disable keyboard input beforehand
    document.addEventListener('keydown', () => {
      return false;
    });

    // Create a new PropFactory
    const propFactory = new PropFactory(trial, dataframe);
    const propsGenerated = propFactory.generate();

    // Display the screen with the generated props
    const view = new View();
    view.display(
        trial.display,
        propsGenerated.props,
        displayElement,
        propsGenerated.duration,
        propsGenerated.callback
    );
  };

  return plugin;
})();
