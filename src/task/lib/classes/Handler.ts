// Configuration
import {Configuration} from '../configuration';

/**
 * Utility class exposing each of the different handlers
 * used by the screens of the game
 */
class Handler {
  private startTime: number;
  private dataframe: Data;

  /**
   * Default constructor
   * @param {number} startTime starting time
   * @param {Data} dataframe jsPsych data
   */
  constructor(startTime: number, dataframe: Data) {
    this.startTime = startTime;
    this.dataframe = dataframe;
  }

  /**
   * Handle selection events in a particular trial
   * @param {Options} option selected option
   * @param {Points} points selected option
   * @param {Options} answer selected option
   */
  public option(
      option: Options,
      points: {options: Points},
      answer: Options,
  ): void {
    const endTime = performance.now();
    const duration = endTime - this.startTime;

    // Store the correct answer
    this.dataframe.realAnswer = answer;

    // Adjust for transition time, 2250ms
    this.dataframe.trialDuration = duration - 2250;

    // Check if they chose the correct option. We record this
    // for all trials, but we only need 'playerGuess'-type trials
    this.dataframe.correctGuess = option === answer ? 1 : 0;

    // Store the participant selection
    this.dataframe.selectedOption_player = option === 'Option 1' ? 1 : 2;

    // Store the points as provided
    this.dataframe.playerPoints_option1 = points.options.one.participant;
    this.dataframe.partnerPoints_option1 = points.options.one.partner;
    this.dataframe.playerPoints_option2 = points.options.two.participant;
    this.dataframe.partnerPoints_option2 = points.options.two.partner;

    // All other trials, add points from option participant selected
    if (option === 'Option 1') {
      this.dataframe.playerPoints_selected = points.options.one.participant;
      this.dataframe.partnerPoints_selected = points.options.one.partner;
    } else {
      this.dataframe.playerPoints_selected = points.options.two.participant;
      this.dataframe.partnerPoints_selected = points.options.two.partner;
    }

    // Finish trial
    this.finish();
  }

  /**
   * Handler called after avatar selected
   * @param {string} selection avatar selection key
   */
  public selection(selection: string): void {
    // Obtain the selected avatar
    const selectedAvatar =
        Configuration.avatars.names.participant.indexOf(selection);

    // Update the global Experiment state
    window.Experiment.setGlobalStateValue(
        'participantAvatar',
        selectedAvatar,
    );

    // Finish trial
    this.finish();
  }

  /**
   * Handler called after questions completed
   * @param {number} one value of the first slider
   * @param {number} two value of the second slider
   */
  public inference(one: number, two: number): void {
    // Store the responses
    this.dataframe.inferenceResponse_Selfish = one;
    this.dataframe.inferenceResponse_Harm = two;

    // Finish trial
    this.finish();
  }

  /**
   * Handler called after agency question completed
   * @param {number} value value of the agency slider
   */
  public agency(value: number): void {
    // Store the responses
    this.dataframe.agencyResponse = value;

    // Finish trial
    this.finish();
  }

  /**
   * Handler called after classification question completed
   * @param {string} type the participant's classification
   * of their partner
   */
  public classification(type: string): void {
    // Store the responses
    this.dataframe.classification = type;

    // Finish trial
    this.finish();
  }

  /**
   * export function to finish the trial and unmount React components
   * cleanly if required
   */
  public finish(): void {
    // Record the total reaction time
    const endTime = performance.now();
    const duration = endTime - this.startTime;
    this.dataframe.trialDuration = duration;

    // If the next trial isn't React-based, clean up React
    // TODO: We need to clear the sceen.

    // Re-enable keyboard actions
    document.removeEventListener('keydown', () => {
      return false;
    });

    // Finish the jsPsych trial
    jsPsych.finishTrial(this.dataframe);
  }
}

export default Handler;
