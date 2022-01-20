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

// Extend the 'expect' function
expect.extend(toHaveNoViolations);

// Setup the Experiment instance
beforeEach(() => {
  window['Experiment'] = jest.fn().mockImplementation();
  window['Experiment'].setGlobalStateValue = jest.fn();
  window['Experiment'].getGlobalStateValue = jest.fn();
});

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
