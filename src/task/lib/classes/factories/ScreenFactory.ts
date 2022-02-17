/**
 * Factory pattern to generate screens
 */
class ScreenFactory implements Factory {
  private trial: Trial;

  /**
   * Default constructor
   * @param {Trial} trial jsPsych trial data
   */
  constructor(trial: Trial) {
    this.trial = trial;
  }

  public generate(type: string) {
    
  }
}

export default ScreenFactory;
