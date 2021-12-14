// React
import ReactDOM from 'react-dom';

// Logging library
import consola from 'consola';

// Core modules
import {Configuration} from './Configuration';
import {display} from './lib/view/Functions';

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
      playerPoints: 0,
      partnerPoints: 0,
      selectedOption: -1,
      questionOne: -1,
      questionTwo: -1,
      agencyResponse: -1,
      rt: 0,
    };

    consola.debug(`Running trial stage '${trial.display}'`);

    // Generate and configure props based on the stage
    let screenProps:
        MatchedProps | MatchingProps |
        TrialProps | SelectAvatarProps |
        InferenceProps | AgencyProps;

    // Timeout information
    let timeoutDuration = 0;
    let timeoutCallback: () => void;

    switch (trial.display as DisplayType) {
      // Phase 1, 2, and 3 trials
      case 'playerChoice':
      case 'playerGuess':
      case 'playerChoice2': {
        // Sum the points from the previous trials
        const participantPoints =
          jsPsych.data.get().select('playerPoints').sum();
        const partnerPoints =
          jsPsych.data.get().select('partnerPoints').sum();

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

        timeoutDuration = 2000;
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
      trialData.rt = duration;

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
      // Record the total reaction time
      const _endTime = performance.now();
      const _duration = _endTime - startTime;
      trialData.rt = _duration;

      // Store the responses
      trialData.questionOne = responseOne;
      trialData.questionTwo = responseTwo;

      // End trial
      finishTrial();
    }

    /**
     * Handler called after questions completed
     * @param {number} agencyResponse value of the agency slider
     */
    function agencySelectionHandler(
        agencyResponse: number,
    ): void {
      // Record the total reaction time
      const _endTime = performance.now();
      const _duration = _endTime - startTime;
      trialData.rt = _duration;

      // Store the responses
      trialData.agencyResponse = agencyResponse;

      // End trial
      finishTrial();
    }

    /**
     * Function to finish the trial and unmount React components
     * cleanly if required
     */
    function finishTrial(): void {
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
