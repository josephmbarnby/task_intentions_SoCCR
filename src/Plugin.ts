// React
import ReactDOM from 'react-dom';

// Logging library
import consola from 'consola';

// Core modules
import {Configuration} from './lib/Configuration';
import {calculatePoints, showDisplay} from './lib/Functions';

// API modules
import {Experiment} from 'crossplatform-jspsych-wrapper';

jsPsych.plugins['intentions-game'] = (() => {
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
    const trialData: Data = {
      display: trial.display, // the display type
      playerPoints: null, // number of points received by the participant
      partnerPoints: null, // number of points received by the partner
      selectedOption: null, // option selected by participant
      correctGuess: null, // whether or not the participant guessed correctly
      inferenceResponseOne: null, // float response to inference question one
      inferenceResponseTwo: null, // float response to inference question two
      agencyResponse: null, // float response to agency question
      classification: null, // classification string selected by participant
      trialDuration: null, // duration of the trial in ms
    };

    // Debug statement
    consola.debug(`Running trial stage '${trial.display}'`);

    // Disable keyboard input beforehand
    document.addEventListener('keydown', () => {
      return false;
    });

    // Timeout information
    let duration = 0;
    let callback: () => void;

    // Sum the points from the previous trials
    const participantPoints = calculatePoints(trial.display, 'playerPoints');
    const partnerPoints = calculatePoints(trial.display, 'partnerPoints');

    // Get the prior phase, checking first that there was a prior trial
    let postPhase: Display;
    if (jsPsych.data.get().last().values().length > 0) {
      postPhase = jsPsych.data.get().last().values()[0].display;
    }

    // Generate and configure props based on the stage
    let props:
        Screens.Agency | Screens.Classification |
        Screens.Inference | Screens.Matched |
        Screens.Matching | Screens.SelectAvatar |
        Screens.Trial | Screens.Summary;
    switch (trial.display as Display) {
      // Phase 1, 2, and 3 trials
      case 'playerChoice':
      case 'playerChoicePractice':
      case 'playerGuess':
      case 'playerGuessPractice':
      case 'playerChoice2': {
        // Setup the props
        props = {
          display: trial.display,
          isPractice: trial.isPractice,
          participantPoints: participantPoints,
          partnerPoints: partnerPoints,
          options: {
            one: {
              participant: trial.optionOneParticipant,
              partner: trial.optionOnePartner,
            },
            two: {
              participant: trial.optionTwoParticipant,
              partner: trial.optionTwoPartner,
            },
          },
          answer: trial.answer,
          selectionHandler: optionHandler,
        };
        break;
      }

      // Matching and matched stages
      case 'matched':
      case 'matching':
        // Setup the props
        props = {
          display: trial.display,
        };

        if (trial.display === 'matched') {
          // Short timeout for 'matched' screen
          duration = 2000;
        } else {
          // Random timeout for 'matching' process
          duration = 2000 + (1 + Math.random() * 5) * 1000;
        }

        // Set the timeout callback function
        callback = finishTrial;
        break;

      // Selection screen
      case 'selection':
        // Setup the props
        props = {
          display: trial.display,
          selectionHandler: avatarSelectionHandler,
        };
        break;

      // Inference screen
      case 'inference':
        // Setup the props
        props = {
          display: trial.display,
          selectionHandler: inferenceSelectionHandler,
        };
        break;

      // Agency screen
      case 'agency':
        // Setup the props
        props = {
          display: trial.display,
          selectionHandler: agencySelectionHandler,
        };
        break;

      // Classification screen
      case 'classification':
        // Setup the props
        props = {
          display: trial.display,
          selectionHandler: classificationSelectionHandler,
        };
        break;

      // Classification screen
      case 'summary':
        // Setup the props
        props = {
          display: trial.display,
          postPhase: postPhase,
          selectionHandler: finishTrial,
        };
        break;

      // Default error state
      default:
        // Log an error message and finish the trial
        consola.error(`Unknown trial stage '${trial.display}'`);
        finishTrial();
        break;
    }

    // Record the starting time
    const startTime = performance.now();

    // Display the screen with the generated props
    showDisplay(
        trial.display,
        props,
        displayElement,
        duration,
        callback
    );

    /**
     * Handle selection events in a particular trial
     * @param {Options} option selected option
     * @param {Options} answer selected option
     */
    function optionHandler(option: Options, answer: Options) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      trialData.trialDuration = duration;

      // Check if they chose the correct option. We record this
      // for all trials, but we only need 'playerGuess'-type trials
      trialData.correctGuess = option === answer ? 1 : 0;

      // Store the participant selection
      trialData.selectedOption = option === 'Option 1' ? 1 : 2;

      // Points in the 'playerGuess' trials are handled differently
      if (trial.display.toLowerCase().includes('guess')) {
        // Add points from option partner selected
        trialData.playerPoints = answer === 'Option 1' ?
            trial.optionOneParticipant :
            trial.optionTwoParticipant;
        trialData.partnerPoints = answer === 'Option 1' ?
            trial.optionOnePartner :
            trial.optionTwoPartner;
      } else {
        // All other trials, add points from option participant selected
        if (option === 'Option 1') {
          trialData.playerPoints = trial.optionOneParticipant;
          trialData.partnerPoints = trial.optionOnePartner;
        } else {
          trialData.playerPoints = trial.optionTwoParticipant;
          trialData.partnerPoints = trial.optionTwoPartner;
        }
      }

      // Finish trial
      finishTrial();
    }

    /**
     * Handler called after avatar selected
     * @param {string} selection avatar selection key
     */
    function avatarSelectionHandler(selection: string): void {
      // Obtain the selected avatar
      const selectedAvatar =
          Configuration.avatars.names.participant.indexOf(selection);

      // Update the global Experiment state
      (window['Experiment'] as Experiment).setGlobalStateValue(
          'participantAvatar',
          selectedAvatar,
      );

      // Finish trial
      finishTrial();
    }

    /**
     * Handler called after questions completed
     * @param {number} one value of the first slider
     * @param {number} two value of the second slider
     */
    function inferenceSelectionHandler(one: number, two: number): void {
      // Store the responses
      trialData.inferenceResponseOne = one;
      trialData.inferenceResponseTwo = two;

      // Finish trial
      finishTrial();
    }

    /**
     * Handler called after agency question completed
     * @param {number} value value of the agency slider
     */
    function agencySelectionHandler(value: number): void {
      // Store the responses
      trialData.agencyResponse = value;

      // Finish trial
      finishTrial();
    }

    /**
     * Handler called after classification question completed
     * @param {string} type the participant's classification
     * of their partner
     */
    function classificationSelectionHandler(type: string): void {
      // Store the responses
      trialData.classification = type;

      // Finish trial
      finishTrial();
    }

    /**
     * Function to finish the trial and unmount React components
     * cleanly if required
     */
    function finishTrial(): void {
      // Record the total reaction time
      const endTime = performance.now();
      const duration = endTime - startTime;
      trialData.trialDuration = duration;

      // If the next trial isn't React-based, clean up React
      if (trial.clearScreen === true) {
        ReactDOM.unmountComponentAtNode(displayElement);
      }

      // Re-enable keyboard actions
      document.removeEventListener('keydown', () => {
        return false;
      });

      // Finish the jsPsych trial
      jsPsych.finishTrial(trialData);
    }
  };

  return plugin;
})();
