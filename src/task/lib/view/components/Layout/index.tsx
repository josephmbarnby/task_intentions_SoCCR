// React import
import React, {ReactElement} from 'react';

// Grommet component
import {Grommet, ThemeContext} from 'grommet';

// Import styling
import '../../../../css/styles.css';

// Apply custom theme globally
import {Theme} from '../../../theme';

// Custom Screens
import Agency from '../../screens/Agency';
import Classification from '../../screens/Classification';
import Trial from '../../screens/Trial';
import SelectAvatar from '../../screens/SelectAvatar';
import Matching from '../../screens/Matching';
import Matched from '../../screens/Matched';
import Inference from '../../screens/Inference';
import Summary from '../../screens/Summary';
import End from '../../screens/End';

// Other imports
import consola from 'consola';

/**
 * Generic container for all Grommet components
 * @param {Props.Components.Layout} props collection of props for the primary
 * child component
 * @return {ReactElement}
 */
export const Layout = (props: Props.Components.Layout): ReactElement => {
  let screen: ReactElement;

  // Define the exact component that is rendered
  switch (props.display) {
    // Trial stages
    case 'playerChoice':
    case 'playerChoicePractice':
    case 'playerGuess':
    case 'playerGuessPractice':
    case 'playerChoice2': {
      screen = <Trial {...props.screen as Props.Screens.Trial} />;
      break;
    }

    // Inference trials
    case 'inference':
      screen = <Inference {...props.screen as Props.Screens.Inference} />;
      break;

    // Agency test
    case 'agency':
      screen = <Agency {...props.screen as Props.Screens.Agency} />;
      break;

    // Classification question
    case 'classification':
      screen =
          <Classification {...props.screen as Props.Screens.Classification} />;
      break;

    // Selection screen
    case 'selection':
      screen = <SelectAvatar {...props.screen as Props.Screens.SelectAvatar} />;
      break;

    // Match screens
    case 'matched':
      screen = <Matched />;
      break;
    case 'matching':
      screen = <Matching {...props.screen as Props.Screens.Matching} />;
      break;

    // Summary screen after each phase
    case 'summary':
      screen = <Summary {...props.screen as Props.Screens.Summary} />;
      break;

    // End screen at the conclusion of the game
    case 'end':
      screen = <End />;
      break;

    // Likely a mistake
    default:
      consola.error(`Unknown display type '${props.display}'`);
      screen = <p>Error.</p>;
      break;
  }

  // Return a styled Grommet instance with the global theme extension
  return (
    <Grommet
      full='min'
      style={{
        // Dimensions
        minHeight: '70vh',
        minWidth: '70vw',
        // Flex properties
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // Overflow
        overflow: 'hidden',
      }}>
      <ThemeContext.Extend value={Theme}>
        {screen}
      </ThemeContext.Extend>
    </Grommet>
  );
};

export default Layout;
