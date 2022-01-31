// React
import React from 'react';

// Test utilities
import {waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {axe, toHaveNoViolations} from 'jest-axe';

// Custom wrapper
import {render} from './Wrapper';

// Test components
import Trial from '../../../../src/lib/view/screens/Trial';

// Extend the 'expect' function
expect.extend(toHaveNoViolations);

// Mock jsPsych
import 'jspsych';
jest.mock('jspsych');

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

test('loads and displays Trial screen', async () => {
  render(
      <Trial
        display='playerChoice'
        isPractice={false}
        participantPoints={5}
        partnerPoints={7}
        options={{
          one: {
            participant: 1,
            partner: 2,
          },
          two: {
            participant: 2,
            partner: 1,
          },
        }}
        answer='Option 1'
        selectionHandler={(selection: string) => {
          console.info(`Selected:`, selection);
        }}
      />
  );

  // Waiting for 'TextTransition' elements to have updated
  // upon first rendering the screen
  await waitFor(() => {
    expect(screen.getAllByText('You')).not.toBe(null);
  });
});

test('check Trial accessibility', async () => {
  const {container} = render(
      <Trial
        display='playerChoice'
        isPractice={false}
        participantPoints={5}
        partnerPoints={7}
        options={{
          one: {
            participant: 1,
            partner: 2,
          },
          two: {
            participant: 2,
            partner: 1,
          },
        }}
        answer='Option 1'
        selectionHandler={(selection: string) => {
          console.info(`Selected:`, selection);
        }}
      />
  );

  // Asynchronous chain, waiting for 'TextTransition'
  // elements to have updated upon first rendering the screen
  await waitFor(() => {
    expect(screen.getAllByText('Partner')).not.toBe(null);
  }).then(() => {
    const results = axe(container, {
    }).then(() => {
      expect(results).toHaveNoViolations();
    });
  });
});
