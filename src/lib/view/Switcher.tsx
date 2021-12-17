// React import
import React, {ReactElement} from 'react';

// Grommet component
import {Grommet, ThemeContext} from 'grommet';

// Import styling
import '../../css/styles.css';

// Apply custom theme globally
import {Theme} from './Theme';

// Custom Screens
import Agency from './screens/Agency';
import Classification from './screens/Classification';
import Trial from './screens/Trial';
import SelectAvatar from './screens/SelectAvatar';
import Matching from './screens/Matching';
import Matched from './screens/Matched';
import Inference from './screens/Inference';

// Other imports
import consola from 'consola';

/**
 * Generic container for all Grommet components
 * @param {any} props collection of props for the primary
 * child component
 * @return {ReactElement}
 */
export function Switcher(props: Switcher): ReactElement {
  let screen: ReactElement;

  // Define the exact component that is rendered
  switch (props.display) {
    // Trial stages
    case 'playerChoice':
    case 'playerGuess':
    case 'playerChoice2': {
      const displayProps = props.screen as Screens.Trial;
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
              (props.screen as Screens.Inference).selectionHandler
            }
          />;
      break;

    // Agency test
    case 'agency':
      screen =
          <Agency
            display={props.display}
            selectionHandler={
              (props.screen as Screens.Agency).selectionHandler
            }
          />;
      break;

    // Classification question
    case 'classification':
      screen =
          <Classification
            display={props.display}
            selectionHandler={
              (props.screen as Screens.Classification).selectionHandler
            }
          />;
      break;

    // Selection screen
    case 'selection':
      screen =
        <SelectAvatar
          display={props.display}
          selectionHandler={
            (props.screen as Screens.SelectAvatar).selectionHandler
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
      <ThemeContext.Extend value={Theme}>
        {screen}
      </ThemeContext.Extend>
    </Grommet>
  );
}
