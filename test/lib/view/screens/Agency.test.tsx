// Test utilities
import {waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {axe, toHaveNoViolations} from 'jest-axe';

// Custom wrapper
import {render} from '../../Wrapper';

// Screen factory
import ScreenFactory from '@classes/factories/ScreenFactory';

// Extend the 'expect' function
expect.extend(toHaveNoViolations);

let screenFactory: ScreenFactory;
beforeAll(() => {
  screenFactory = new ScreenFactory();
});

test('loads and displays Agency screen', async () => {
  render(screenFactory.generate({
    display: 'agency',
    screen: {
      trial: 0,
      display: 'agency',
      handler: () => {
        console.info('Selection handler called');
      },
    },
  }));

  await waitFor(() => screen.queryByText('Agree'));

  expect(screen.queryByText('Agree')).not.toBeNull();
});

test('check Agency screen accessibility', async () => {
  const {container} = render(screenFactory.generate({
    display: 'agency',
    screen: {
      trial: 0,
      display: 'agency',
      handler: () => {
        console.info('Selection handler called');
      },
    },
  }));

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
