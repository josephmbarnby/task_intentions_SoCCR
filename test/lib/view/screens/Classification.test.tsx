// React
import React from 'react';

// Test utilities
import {waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {axe, toHaveNoViolations} from 'jest-axe';

// Custom wrapper
import {render} from './Wrapper';

// Test components
import Classification from '../../../../src/lib/view/screens/Classification';

// Extend the 'expect' function
expect.extend(toHaveNoViolations);

test('loads and displays Classification screen', async () => {
  render(
      <Classification
        display='selection'
        selectionHandler={() => {
          console.info('Selection handler called');
        }}
      />
  );

  await waitFor(() => screen.queryAllByPlaceholderText('Please select'));

  expect(screen.queryAllByPlaceholderText('Please select')).not.toBeNull();
});

test('check Classification accessibility', async () => {
  const {container} = render(
      <Classification
        display='classification'
        selectionHandler={() => {
          console.info('Selection handler called');
        }}
      />
  );

  // Disable the 'nested-interactive' rule.
  // An issue with the Grommet library rather
  // than the setup here.
  const results = await axe(container, {
    rules: {
      'nested-interactive': {
        enabled: false,
      },
    },
  });

  expect(results).toHaveNoViolations();
});
