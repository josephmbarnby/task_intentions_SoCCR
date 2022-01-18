// React
import React from 'react';

// Test utilities
import {render, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {axe, toHaveNoViolations} from 'jest-axe';

// Test components
import Inference from '../../../../src/lib/view/screens/Inference';

// Extend the 'expect' function
expect.extend(toHaveNoViolations);

test('loads and displays Inference screen', async () => {
  render(
      <Inference
        display='selection'
        selectionHandler={() => {
          console.info('Selection handler called');
        }}
      />
  );

  await waitFor(() => screen.queryAllByText('Totally'));

  expect(screen.queryAllByText('Totally')).not.toBeNull();
});

test('check Inference accessibility', async () => {
  const {container} = render(
      <Inference
        display='inference'
        selectionHandler={() => {
          console.info('Selection handler called');
        }}
      />
  );

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
