// React
import React from 'react';

// Test utilities
import {render, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {axe, toHaveNoViolations} from 'jest-axe';

// Test components
import Agency from '../../../../src/lib/view/screens/Agency';

// Extend the 'expect' function
expect.extend(toHaveNoViolations);

test('loads and displays Agency screen', async () => {
  render(
      <Agency
        display='selection'
        selectionHandler={() => {
          console.info('Selection handler called');
        }}
      />
  );

  await waitFor(() => screen.queryByText('Totally'));

  expect(screen.queryByText('Totally')).not.toBeNull();
});

test('check Agency accessibility', async () => {
  const {container} = render(
      <Agency
        display='selection'
        selectionHandler={() => {
          console.info('Selection handler called');
        }}
      />
  );

  // Run the check, disabling 'duplicate-id' rule.
  // Rule fails on components inside the avatar SVGs.
  const results = await axe(container, {
    rules: {
      'duplicate-id': {
        enabled: false,
      },
    },
  });

  expect(results).toHaveNoViolations();
});
