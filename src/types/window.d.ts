import Experiment from 'crossplatform-jspsych-wrapper';

declare global {
  interface Window {
    Experiment: typeof Experiment;
  }
}
