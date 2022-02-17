// React imports
import React, {ReactElement} from 'react';

// Logging library
import consola from 'consola';

// Custom Screens
import Agency from '../../view/screens/Agency';
import Classification from '../../view/screens/Classification';
import Trial from '../../view/screens/Trial';
import SelectAvatar from '../../view/screens/SelectAvatar';
import Matching from '../../view/screens/Matching';
import Matched from '../../view/screens/Matched';
import Inference from '../../view/screens/Inference';
import Summary from '../../view/screens/Summary';
import End from '../../view/screens/End';

/**
 * Factory pattern to generate screens
 */
class ScreenFactory implements Factory {
  /**
   * Generate and return the React element representing
   * the screen
   * @param {any} props screen props
   * @return {ReactElement}
   */
  public generate(props: Props.Components.Layout): ReactElement {
    let screen: ReactElement;

    // Define the exact component that is rendered
    switch (props.display as Display) {
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
        screen =
            <Inference {...props.screen as Props.Screens.Inference} />;
        break;

      // Agency test
      case 'agency':
        screen = <Agency {...props.screen as Props.Screens.Agency} />;
        break;

      // Classification question
      case 'classification':
        screen =
            <Classification
              {...props.screen as Props.Screens.Classification}
            />;
        break;

      // Selection screen
      case 'selection':
        screen =
            <SelectAvatar
              {...props.screen as Props.Screens.SelectAvatar}
            />;
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

    return screen;
  }
}

export default ScreenFactory;
