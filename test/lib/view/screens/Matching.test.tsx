// React
import React from 'react';

// Test utilities
import {waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {axe, toHaveNoViolations} from 'jest-axe';

// Custom wrapper
import {render} from './Wrapper';

// Test components
import Matching from '../../../../src/lib/view/screens/Matching';

// Extend the 'expect' function
expect.extend(toHaveNoViolations);

test('loads and displays Matching screen', async () => {
  render(<Matching />);

  await waitFor(() => screen.queryByText('Finding you a partner...'));

  expect(screen.queryByText('Finding you a partner...')).not.toBeNull();
});

test('check Matching accessibility', async () => {
  const {container} = render(<Matching />);

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
