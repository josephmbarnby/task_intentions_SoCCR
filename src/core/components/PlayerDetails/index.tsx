// React imports
import React, {ReactElement} from 'react';

// Components
import Avatar from 'boring-avatars';
import {Box} from 'grommet';

// Useful constants
import {AVATAR_VARIANT, AVATAR_COLORS} from '../../Constants';

// Types
declare type PlayerDetails = {
  size: number;
  name: string;
  state: string;
  setState: (avatar: string) => void;
};

/**
 * A selectable avatar with grow behaviour
 * @param {Components.PlayerDetails} props component props
 * @return {ReactElement}
 */
const PlayerDetails = (props: PlayerDetails): ReactElement => {
  return (
    <Box
      margin='medium'
      round={{size: '50%'}}
      className={
        props.name === props.state ? 'selectable selected' : 'selectable'
      }
      onClick={() => {
        // Call the state update function with the name
        props.setState(props.name);
      }}
    >
      <Avatar
        size={props.size}
        name={props.name}
        variant={AVATAR_VARIANT}
        colors={AVATAR_COLORS}
      />
    </Box>
  );
};

export default PlayerDetails;
