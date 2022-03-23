// Test utilities
import {waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {axe, toHaveNoViolations} from 'jest-axe';
import {act} from 'react-dom/test-utils';

// React
import React from 'react';

// Custom wrapper
import {render} from '../../Wrapper';

// Layout component
import Layout from '@components/Layout';

// Extend the 'expect' function
expect.extend(toHaveNoViolations);

test('loads and displays Layout component with Agency screen', async () => {
  await waitFor(() => render(
      <Layout
        display='agency'
        screen={{
          trial: 1,
          display: 'agency',
          handler: () => {
            return;
          },
        }}
      />
  ));

  await waitFor(() => expect(screen.getByText('Agree')).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText('Disagree')).toBeInTheDocument());
});

test('check Layout component accessibility', async () => {
  const {container} = render(
      <Layout
        display='agency'
        screen={{
          trial: 1,
          display: 'agency',
          handler: () => {
            return;
          },
        }}
      />
  );

  await act(async () => {
    const results = await axe(container);
    await waitFor(() => expect(results).toHaveNoViolations());
  });
});
