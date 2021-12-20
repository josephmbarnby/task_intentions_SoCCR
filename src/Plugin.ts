// React
import ReactDOM from 'react-dom';

// Logging library
import consola from 'consola';

// Core modules
import {Configuration} from './Configuration';
import {calculatePoints, display} from './core/Functions';

// API modules
import {Experiment} from 'crossplatform-jspsych-wrapper';

jsPsych.plugins['intentions-game'] = (() => {
  const plugin = {
    info: {},
    trial: (displayElement: HTMLElement, trial: Trial) => {
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
      clearScreen: {
        type: jsPsych.plugins.parameterType.BOOLEAN,
        pretty_name: 'Clear after trial',
        default: false,
        description: 'Clear the screen after this trial',
      },
    },
  };

  plugin.trial = (displayElement: HTMLElement, trial: Trial) => {
    // Setup data storage
    const trialData = {
      display: trial.display,
      playerPoints: null,
      partnerPoints: null,
      selectedOption: null,
      inferenceResponseOne: null,
      inferenceResponseTwo: null,
      agencyResponse: null,
      classification: null,
      trialDuration: null,
    };

    consola.debug(`Running trial stage '${trial.display}'`);

    // Generate and configure props based on the stage
    let screenProps:
        Screens.Agency | Screens.Classification |
        Screens.Inference | Screens.Matched |
        Screens.Matching | Screens.SelectAvatar |
        Screens.Trial | Screens.Summary;

    // Timeout information
    let timeoutDuration = 0;
    let timeoutCallback: () => void;

    // Sum the points from the previous trials
    const participantPoints = calculatePoints(trial.display, 'playerPoints');
    const partnerPoints = calculatePoints(trial.display, 'partnerPoints');

    // Get the prior phase
    const postPhase = jsPsych.data.get().last().values()[0].display;

    switch (trial.display as Display) {
      // Phase 1, 2, and 3 trials
      case 'playerChoice':
      case 'playerGuess':
      case 'playerChoice2': {
        // Setup the props
        screenProps = {
          display: trial.display,
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
        screenProps = {
          display: trial.display,
        };

        if (trial.display === 'matched') {
          // Short timeout for 'matched' screen
          timeoutDuration = 2000;
        } else {
          // Random timeout for 'matching' process
          timeoutDuration =
              2000 + (1 + Math.random() * 5) * 1000;
        }

        timeoutCallback = finishTrial;
        break;

      // Selection screen
      case 'selection':
        // Setup the props
        screenProps = {
          display: trial.display,
          selectionHandler: avatarSelectionHandler,
        };
        break;

      // Inference screen
      case 'inference':
        // Setup the props
        screenProps = {
          display: trial.display,
          selectionHandler: inferenceSelectionHandler,
        };
        break;

      // Agency screen
      case 'agency':
        // Setup the props
        screenProps = {
          display: trial.display,
          selectionHandler: agencySelectionHandler,
        };
        break;

      // Classification screen
      case 'classification':
        // Setup the props
        screenProps = {
          display: trial.display,
          selectionHandler: classificationSelectionHandler,
        };
        break;

      // Classification screen
      case 'summary':
        // Setup the props
        screenProps = {
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
    display(
        trial.display,
        displayElement,
        screenProps,
        timeoutDuration,
        timeoutCallback
    );

    /**
     * Handle Button-press events in a particular trial
     * @param {'Option 1' | 'Option 2'} option selected option
     */
    function optionHandler(option: 'Option 1' | 'Option 2') {
      const endTime = performance.now();
      const duration = endTime - startTime;
      trialData.trialDuration = duration;

      if (option === 'Option 1') {
        // Participant chose option 1
        trialData.selectedOption = 1;

        // Update the score with values of option 1
        trialData.playerPoints = trial.optionOneParticipant;
        trialData.partnerPoints = trial.optionOnePartner;
      } else if (option === 'Option 2') {
        // Participant chose option 2
        trialData.selectedOption = 2;

        // Update the score with values of option 2
        trialData.playerPoints = trial.optionTwoParticipant;
        trialData.partnerPoints = trial.optionTwoPartner;
      }

      // End trial
      finishTrial();
    }

    /**
     * Handler called after avatar selected
     * @param {string} _selection avatar selection key
     */
    function avatarSelectionHandler(_selection: string): void {
      // Obtain the selected avatar
      const selectedAvatar = Configuration.avatars.indexOf(_selection);

      // Update the global Experiment state
      (window['Experiment'] as Experiment).setGlobalStateValue(
          'participantAvatar',
          selectedAvatar,
      );

      // End trial
      finishTrial();
    }

    /**
     * Handler called after questions completed
     * @param {number} responseOne value of the first slider
     * @param {number} responseTwo value of the second slider
     */
    function inferenceSelectionHandler(
        responseOne: number,
        responseTwo: number
    ): void {
      // Store the responses
      trialData.inferenceResponseOne = responseOne;
      trialData.inferenceResponseTwo = responseTwo;

      // End trial
      finishTrial();
    }

    /**
     * Handler called after agency question completed
     * @param {number} agencyResponse value of the agency slider
     */
    function agencySelectionHandler(
        agencyResponse: number,
    ): void {
      // Store the responses
      trialData.agencyResponse = agencyResponse;

      // End trial
      finishTrial();
    }

    /**
     * Handler called after classification question completed
     * @param {string} classification the participant's classification
     * of their partner
     */
    function classificationSelectionHandler(
        classification: string,
    ): void {
      // Store the responses
      trialData.classification = classification;

      // End trial
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

      // Finish the jsPsych trial
      jsPsych.finishTrial(trialData);
    }
  };

  return plugin;
})();
