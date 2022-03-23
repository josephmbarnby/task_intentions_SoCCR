// Test utilities
import {waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {axe, toHaveNoViolations} from 'jest-axe';

// Custom wrapper
import {render} from '../../Wrapper';

// Screen factory
import ScreenFactory from '@classes/factories/ScreenFactory';

// Extend the 'expect' function
expect.extend(toHaveNoViolations);

let screenFactory: ScreenFactory;
beforeAll(() => {
  screenFactory = new ScreenFactory();
});

// Mock jsPsych
import 'jspsych';
jest.mock('jspsych');

// Mock the jsPsych wrapper library
import {Experiment} from 'jspsych-wrapper';
jest.mock('jspsych-wrapper');

// Setup the Experiment instances
beforeEach(() => {
  // Experiment
  (window['Experiment'] as RecursivePartial<Experiment>) = {
    getGlobalStateValue: jest.fn(),
    setGlobalStateValue: jest.fn(),
  };
});

test('loads and displays Summary screen', async () => {
  render(screenFactory.generate({
    display: 'summary',
    screen: {
      trial: 0,
      display: 'summary',
      postPhase: 'playerChoice',
      handler: () => {
        console.info('Selection handler called');
      },
    },
  }));

  // Waiting for 'TextTransition' elements to have updated
  // upon first rendering the screen
  await waitFor(() => {
    expect(screen.getAllByText('0')).not.toBe(null);
  });
});

test('check Summary screen accessibility', async () => {
  const {container} = render(screenFactory.generate({
    display: 'summary',
    screen: {
      trial: 0,
      display: 'summary',
      postPhase: 'playerChoice',
      handler: () => {
        console.info('Selection handler called');
      },
    },
  }));

  // Asynchronous chain, waiting for 'TextTransition'
  // elements to have updated upon first rendering the screen
  await waitFor(() => {
    expect(screen.getAllByText('0')).not.toBe(null);
  }).then(() => {
    const results = axe(container, {
    }).then(() => {
      expect(results).toHaveNoViolations();
    });
  });
});
