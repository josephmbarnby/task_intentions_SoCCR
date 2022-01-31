// React
import React from 'react';

// Test utilities
import {waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {axe, toHaveNoViolations} from 'jest-axe';

// Custom wrapper
import {render} from './Wrapper';

// Test components
import Matched from '../../../../src/lib/view/screens/Matched';

// Mock the jsPsych wrapper library
import {Experiment} from 'jspsych-wrapper';
jest.mock('jspsych-wrapper');

// Recursive partial type, allows tests using the
// 'jspsych-wrapper' Experiment class to be run
declare type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
}

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
  render(<Matched />);

  await waitFor(() => screen.queryByText('Partner found!'));

  expect(screen.queryByText('Partner found!')).not.toBeNull();
});

test('check Matched accessibility', async () => {
  const {container} = render(<Matched />);

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
