// React import
import React, {ReactElement} from 'react';

// Grommet component
import {Grommet} from 'grommet';

// Import styling
import '../../css/styles.css';

// Custom Screens
import {Trial} from './screens/Trial';
import {SelectAvatar} from './screens/SelectAvatar';
import {Matching} from './screens/Matching';
import {Matched} from './screens/Matched';

// Custom types
import {
  SelectionScreenProps,
  SwitcherProps,
  TrialScreenProps,
} from '../types/screens';

// Other imports
import consola from 'consola';

/**
 * Generic container for all Grommet components
 * @param {any} props collection of props for the primary
 * child component
 * @return {ReactElement}
 */
export function Switcher(props: SwitcherProps): ReactElement {
  let screen: ReactElement;

  // Define the exact component that is rendered
  switch (props.display) {
    // Trial stages
    case 'playerChoice':
    case 'playerGuess':
      screen =
        <Trial
          avatar={(props.screenProps as TrialScreenProps).avatar}
          points={(props.screenProps as TrialScreenProps).points}
          data={(props.screenProps as TrialScreenProps).data}
          display={props.display}
          endTrial={(props.screenProps as TrialScreenProps).endTrial}
        />;
      break;

    // Selection screen
    case 'selection':
      screen =
        <SelectAvatar
          selectionHandler={
            (props.screenProps as SelectionScreenProps).selectionHandler
          }
        />;
      break;

    // Match screens
    case 'matched':
      screen = <Matched />;
      break;
    case 'matching':
      screen = <Matching />;
      break;

    // Likely a mistake
    default:
      consola.error(`Unknown display type '${props.display}'`);
  }

  return (
    <Grommet>
      {screen}
    </Grommet>
  );
}
