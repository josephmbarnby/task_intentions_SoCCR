// React
import React from 'react';

// Test utilities
import {waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {axe, toHaveNoViolations} from 'jest-axe';

// Custom wrapper
import {render} from './Wrapper';

// Test components
import SelectAvatar from '../../../../src/lib/view/screens/SelectAvatar';

// Extend the 'expect' function
expect.extend(toHaveNoViolations);

test('loads and displays SelectAvatar screen', async () => {
  render(
      <SelectAvatar
        display='selection'
        handler={() => {
          console.info('Selection handler called');
        }}
      />
  );

  await waitFor(() => screen.getByRole('heading'));

  expect(screen.getByRole('heading')).toHaveTextContent('Choose your Avatar!');
});

test('check SelectAvatar accessibility', async () => {
  const {container} = render(
      <SelectAvatar
        display='selection'
        handler={() => {
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
