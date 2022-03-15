// Prop factory test
// Prop factory
import PropFactory from '@classes/factories/PropFactory';

// Mock jsPsych
import 'jspsych';
jest.mock('jspsych');

// Mock the jsPsych wrapper library
import {Experiment} from 'jspsych-wrapper';
jest.mock('jspsych-wrapper');

// Import the Handler class
import Handler from '@classes/Handler';

// Recursive partial type, allows tests using the
// 'jspsych-wrapper' Experiment class to be run
declare type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
}

/**
 * Generate a Trial configuration for test use
 * @param {Display} display the display type being tested
 * @return {any}
 */
const getTrialConfiguration = (display: Display): Trial => {
  return {
    trial: 1,
    display: display,
    optionOneParticipant: 0,
    optionOnePartner: 0,
    optionTwoParticipant: 0,
    optionTwoPartner: 0,
    typeOne: '',
    typeTwo: '',
    avatar: 0,
    answer: 'Option 1',
    isPractice: false,
    fetchData: false,
    clearScreen: false,
  };
};

/**
 * Generate a Handler instance for test use
 * @param {Display} display the display type being tested
 * @return {any}
 */
const getHandler = (display: Display): Handler => {
  return new Handler({
    trial: 1,
    display: display,
    playerPoints_option1: 0,
    partnerPoints_option1: 0,
    playerPoints_option2: 0,
    partnerPoints_option2: 0,
    playerPoints_selected: 0,
    partnerPoints_selected: 0,
    selectedOption_player: 1,
    realAnswer: 'Option 1',
    inferenceResponse_Selfish: 0,
    inferenceResponse_Harm: 0,
    agencyResponse: 0,
    classification: '',
    trialDuration: 100,
    correctGuess: -1,
  }, () => {
    return;
  });
};

// Setup the Experiment instances
beforeEach(() => {
  // Experiment
  (window['Experiment'] as RecursivePartial<Experiment>) = {
    getGlobalStateValue: jest.fn(),
    setGlobalStateValue: jest.fn(),
  };
});

test('generate props for Agency screen', async () => {
  // Create a new PropFactory instance
  const propFactory = new PropFactory(
      getTrialConfiguration('agency'),
      getHandler('agency'),
  );

  // Generate the props
  const generated = propFactory.generate();

  // Check contents of props
  expect(generated.props.trial).toBe(1);
  expect(generated.props.display).toBe('agency');
  expect(generated.props).toHaveProperty('handler');
});

test('generate props for Classification screen', async () => {
  // Create a new PropFactory instance
  const propFactory = new PropFactory(
      getTrialConfiguration('classification'),
      getHandler('classification'),
  );

  // Generate the props
  const generated = propFactory.generate();

  // Check contents of props
  expect(generated.props.trial).toBe(1);
  expect(generated.props.display).toBe('classification');
  expect(generated.props).toHaveProperty('handler');
});

test('generate props for End screen', async () => {
  // Create a new PropFactory instance
  const propFactory = new PropFactory(
      getTrialConfiguration('end'),
      getHandler('end'),
  );

  // Generate the props
  const generated = propFactory.generate();

  // Check contents of props
  expect(generated.props.trial).toBe(1);
  expect(generated.props.display).toBe('end');
  expect(generated.props).not.toHaveProperty('handler');
});

test('generate props for Inference screen', async () => {
  // Create a new PropFactory instance
  const propFactory = new PropFactory(
      getTrialConfiguration('inference'),
      getHandler('inference'),
  );

  // Generate the props
  const generated = propFactory.generate();

  // Check contents of props
  expect(generated.props.trial).toBe(1);
  expect(generated.props.display).toBe('inference');
  expect(generated.props).toHaveProperty('handler');
});

test('generate props for Matched screen', async () => {
  // Create a new PropFactory instance
  const propFactory = new PropFactory(
      getTrialConfiguration('matched'),
      getHandler('matched'),
  );

  // Generate the props
  const generated = propFactory.generate();

  // Check contents of props
  expect(generated.props.trial).toBe(1);
  expect(generated.props.display).toBe('matched');
  expect(generated.props).not.toHaveProperty('handler');
});

test('generate props for Matching screen', async () => {
  // Create a new PropFactory instance
  const propFactory = new PropFactory(
      getTrialConfiguration('matching'),
      getHandler('matching'),
  );

  // Generate the props
  const generated = propFactory.generate();

  // Check contents of props
  expect(generated.props.trial).toBe(1);
  expect(generated.props.display).toBe('matching');
  expect(generated.props.fetchData).toBe(false);
  expect(generated.props).not.toHaveProperty('handler');
});

test('generate props for Summary screen', async () => {
  // Create a new PropFactory instance
  const propFactory = new PropFactory(
      getTrialConfiguration('summary'),
      getHandler('summary'),
  );

  // Generate the props
  const generated = propFactory.generate();

  // Check contents of props
  expect(generated.props.trial).toBe(1);
  expect(generated.props.display).toBe('summary');
  expect(generated.props.postPhase).toBe('playerChoice');
  expect(generated.props).toHaveProperty('handler');
});

test('generate props for Trial screen', async () => {
  // Create a new PropFactory instance
  const propFactory = new PropFactory(
      getTrialConfiguration('playerChoice'),
      getHandler('playerChoice'),
  );

  // Generate the props
  const generated = propFactory.generate();

  // Check contents of props
  expect(generated.props.trial).toBe(1);
  expect(generated.props.display).toBe('playerChoice');
  expect(generated.props.isPractice).toBe(false);
  expect(generated.props.participantPoints).toBe(0);
  expect(generated.props.partnerPoints).toBe(0);
  expect(generated.props.options).toStrictEqual({
    one: {
      participant: 0,
      partner: 0,
    },
    two: {
      participant: 0,
      partner: 0,
    },
  });
  expect(generated.props.answer).toBe('Option 1');
  expect(generated.props).toHaveProperty('handler');
});
