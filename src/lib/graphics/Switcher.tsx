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
import {SelectionScreenProps, TrialScreenProps} from '../types/screens';

// Parameters
import {STAGES} from '../Parameters';

// Other imports
import consola from 'consola';

/**
 * Generic container for all Grommet components
 * @param {any} props collection of props for the primary
 * child component
 * @return {ReactElement}
 */
export function Switcher(props:
  {
    screenType: string;
    screenProps: TrialScreenProps | SelectionScreenProps;
  }): ReactElement {
  let screen: ReactElement;

  // Define the exact component that is rendered
  switch (props.screenType) {
    // Trial stages
    case STAGES.TRIAL_PHASE_ONE:
    case STAGES.TRIAL_PHASE_TWO:
      screen =
        <Trial
          avatar={(props.screenProps as TrialScreenProps).avatar}
          points={(props.screenProps as TrialScreenProps).points}
          data={(props.screenProps as TrialScreenProps).data}
          stage={props.screenType}
          endTrial={(props.screenProps as TrialScreenProps).endTrial}
        />;
      break;

    // Selection screen
    case STAGES.SELECTION:
      screen =
        <SelectAvatar
          selectionHandler={
            (props.screenProps as SelectionScreenProps).selectionHandler
          }
        />;
      break;

    // Match screens
    case STAGES.MATCHED:
      screen = <Matched />;
      break;
    case STAGES.MATCHING:
      screen = <Matching />;
      break;

    // Likely a mistake
    default:
      consola.error(`Unknown screen type '${props.screenType}'`);
  }

  return (
    <Grommet>
      {screen}
    </Grommet>
  );
}
