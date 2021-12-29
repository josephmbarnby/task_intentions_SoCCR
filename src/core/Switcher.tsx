// React import
import React, {ReactElement} from 'react';

// Grommet component
import {Grommet, ThemeContext} from 'grommet';

// Import styling
import '../css/styles.css';

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
import Summary from './screens/Summary';

/**
 * Generic container for all Grommet components
 * @param {Switcher} props collection of props for the primary
 * child component
 * @return {ReactElement}
 */
export const Switcher = (props: Switcher): ReactElement => {
  let screen: ReactElement;

  // Define the exact component that is rendered
  switch (props.display) {
    // Trial stages
    case 'playerChoice':
    case 'playerChoiceTutorial':
    case 'playerGuess':
    case 'playerGuessTutorial':
    case 'playerChoice2': {
      screen = <Trial {...props.screen as Screens.Trial} />;
      break;
    }

    // Inference trials
    case 'inference':
      screen = <Inference {...props.screen as Screens.Inference} />;
      break;

    // Agency test
    case 'agency':
      screen = <Agency {...props.screen as Screens.Agency} />;
      break;

    // Classification question
    case 'classification':
      screen = <Classification {...props.screen as Screens.Classification} />;
      break;

    // Selection screen
    case 'selection':
      screen = <SelectAvatar {...props.screen as Screens.SelectAvatar} />;
      break;

    // Match screens
    case 'matched':
      screen = <Matched />;
      break;
    case 'matching':
      screen = <Matching />;
      break;

    // Summary screen after each phase
    case 'summary':
      screen = <Summary {...props.screen as Screens.Summary} />;
      break;

    // Likely a mistake
    default:
      consola.error(`Unknown display type '${props.display}'`);
      break;
  }

  // Return a Grommet instance with the global theme extension
  return (
    <Grommet>
      <ThemeContext.Extend value={Theme}>
        {screen}
      </ThemeContext.Extend>
    </Grommet>
  );
};

export default Switcher;
