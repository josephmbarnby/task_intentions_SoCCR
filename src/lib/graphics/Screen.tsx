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
  if (props.screenType === 'trial') {
    screenComponent =
      <Trial
        avatar={props.screenProps.avatar}
        points={props.screenProps.points}
        rowData={props.screenProps.rowData}
        callback={props.screenProps.callback}
      />;
  } else if (props.screenType === 'selection') {
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
