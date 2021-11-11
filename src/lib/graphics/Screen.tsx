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
export function Screen(props:
  {
    screenType: string;
    screenProps: any;
  }): ReactElement {
  // Define the exact component that is rendered
  let screenComponent: ReactElement;
  if (props.screenType.startsWith('trial')) {
    screenComponent =
      <Trial
        avatar={props.screenProps.avatar}
        points={props.screenProps.points}
        rowData={props.screenProps.rowData}
        selectionHandler={props.screenProps.selectionHandler}
        stage={props.screenType}
      />;
  } else if (props.screenType === STAGES.SELECTION) {
    screenComponent =
      <SelectAvatar
        selectionHandler={props.screenProps.selectionHandler}
      />;
  } else if (props.screenType === STAGES.MATCHED) {
    screenComponent = <Matched />;
  } else if (props.screenType === STAGES.MATCHING) {
    screenComponent = <Matching />;
  } else {
    consola.error(`Unknown screen type '${props.screenType}'`);
  }

  return (
    <Grommet>
      {screenComponent}
    </Grommet>
  );
}
