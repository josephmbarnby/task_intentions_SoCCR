// Test utilities
import {waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {axe, toHaveNoViolations} from 'jest-axe';

// Custom wrapper
import {render} from './Wrapper';

// Screen factory
import ScreenFactory from
  '../../../../src/task/lib/classes/factories/ScreenFactory';

// Mock the jsPsych wrapper library
import {Experiment} from 'jspsych-wrapper';
jest.mock('jspsych-wrapper');

// Recursive partial type, allows tests using the
// 'jspsych-wrapper' Experiment class to be run
declare type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
}

let screenFactory: ScreenFactory;
beforeAll(() => {
  screenFactory = new ScreenFactory();
});

// Setup the Experiment instances
beforeEach(() => {
  // Experiment
  (window['Experiment'] as RecursivePartial<Experiment>) = {
    getGlobalStateValue: jest.fn(),
    setGlobalStateValue: jest.fn(),
  };
});

// Extend the 'expect' function
expect.extend(toHaveNoViolations);

test('loads and displays Matched screen', async () => {
  render(screenFactory.generate({
    display: 'matched',
    screen: {
      trial: 0,
      display: 'matched',
    },
  }));

  await waitFor(() => screen.queryByText('Partner found!'));

  expect(screen.queryByText('Partner found!')).not.toBeNull();
});

test('check Matched accessibility', async () => {
  const {container} = render(screenFactory.generate({
    display: 'matched',
    screen: {
      trial: 0,
      display: 'matched',
    },
  }));

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
