// React import
import React from 'react';
import {render} from 'react-dom';

// Screen component
import {Screen} from './Screen';

// We need state-based switching between different stages
// If state is 'choice', render the Choice components etc.

/**
 * Switch between different screens
 * @param {string} _type screen type
 * @param {HTMLElement} _target target DOM element
 * @param {any} _screenProps collection of props
 */
export function displayScreen(
    _type: string, _target: HTMLElement, _screenProps: any
): void {
  render(
      <Screen
        screenType={_type}
        screenProps={_screenProps}
      />,
      _target,
  );
}
