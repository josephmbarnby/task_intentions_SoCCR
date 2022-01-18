import React from 'react';
import {render, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

// Test components
import SelectAvatar from '../../../../src/lib/view/screens/SelectAvatar';

test('loads and displays SelectAvatar screen', async () => {
  render(
      <SelectAvatar
        display='selection'
        selectionHandler={() => {
          console.info('Selection handler called');
        }}
      />
  );

  await waitFor(() => screen.getByRole('heading'));

  expect(screen.getByRole('heading')).toHaveTextContent('Choose your Avatar!');
});
