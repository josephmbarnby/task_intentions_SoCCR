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
import {Inference} from './screens/Inference';

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
    case 'playerChoice2': {
      const displayProps = props.screenProps as TrialProps;
      screen =
        <Trial
          display={displayProps.display}
          participantPoints={displayProps.participantPoints}
          partnerPoints={displayProps.partnerPoints}
          options={displayProps.options}
          answer={displayProps.answer}
          selectionHandler={displayProps.selectionHandler}
        />;
      break;
    }

    // Inference trials
    case 'inference':
      screen =
          <Inference
            display={props.display}
            selectionHandler={
              (props.screenProps as InferenceProps).selectionHandler
            }
          />;
      break;

    // Selection screen
    case 'selection':
      screen =
        <SelectAvatar
          display={props.display}
          selectionHandler={
            (props.screenProps as SelectAvatarProps).selectionHandler
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
