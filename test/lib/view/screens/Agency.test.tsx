// React
import React from 'react';

// Test utilities
import {waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {axe, toHaveNoViolations} from 'jest-axe';

// Custom wrapper
import {render} from './Wrapper';

// Test components
import Agency from '../../../../src/lib/view/screens/Agency';

// Extend the 'expect' function
expect.extend(toHaveNoViolations);

test('loads and displays Agency screen', async () => {
  render(
      <Agency
        display='agency'
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
        display='agency'
        selectionHandler={() => {
          console.info('Selection handler called');
        }}
      />
  );

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
