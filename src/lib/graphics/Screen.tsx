// React import
import React, {ReactElement} from 'react';
import {render} from 'react-dom';

// Grommet component
import {Grommet} from 'grommet';

// Import styling
import '../../css/styles.css';

// Custom components
import {Choice} from './components/Choice';
import {SelectAvatar} from './components/SelectAvatar';
import {Matching} from './components/Matching';
import {Matched} from './components/Matched';

/**
 * Generic container for all Grommet components
 * @param {any} props collection of props
 * @return {ReactElement}
 */
export function Screen(props:
  {
    screenType: string;
    screenProps: any;
  }): ReactElement {
  // Define the exact component that is rendered
  let screenComponent: ReactElement;
  if (props.screenType === 'choice') {
    screenComponent =
      <Choice
        avatar={props.screenProps.avatar}
        points={props.screenProps.points}
        rowData={props.screenProps.rowData}
        callback={props.screenProps.callback}
      />;
  } else if (props.screenType === 'avatarSelection') {
    screenComponent =
      <SelectAvatar
        avatarSelectionHandler={props.screenProps.avatarSelectionHandler}
      />;
  } else if (props.screenType === 'matched') {
    screenComponent = <Matched />;
  } else if (props.screenType === 'matching') {
    screenComponent = <Matching />;
  }

  return (
    <Grommet>
      {screenComponent}
    </Grommet>
  );
}

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
