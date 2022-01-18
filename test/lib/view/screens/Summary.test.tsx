// React
import React from 'react';

// Test utilities
import {waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {axe, toHaveNoViolations} from 'jest-axe';

// Custom wrapper
import {render} from './Wrapper';

// Test components
import Summary from '../../../../src/lib/view/screens/Summary';

// Extend the 'expect' function
expect.extend(toHaveNoViolations);

// Mock jsPsych
import 'jspsych';
jest.mock('jspsych');

// Setup the Experiment instances
beforeEach(() => {
  // Experiment
  window['Experiment'] = jest.fn().mockImplementation();
  window['Experiment'].setGlobalStateValue = jest.fn();
  window['Experiment'].getGlobalStateValue = jest.fn().mockReturnValue(10);
});

test('loads and displays Summary screen', async () => {
  render(
      <Summary
        display='summary'
        postPhase='playerChoice'
        selectionHandler={() => {
          console.info('Selection handler called');
        }}
      />
  );

  // Waiting for 'TextTransition' elements to have updated
  // upon first rendering the screen
  await waitFor(() => {
    expect(screen.getAllByText('0')).not.toBe(null);
  });
});

test('check Summary accessibility', async () => {
  const {container} = render(
      <Summary
        display='summary'
        postPhase='playerChoice'
        selectionHandler={() => {
          console.info('Selection handler called');
        }}
      />
  );

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
