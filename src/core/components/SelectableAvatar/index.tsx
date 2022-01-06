// React imports
import React, {ReactElement} from 'react';

// Components
import Avatar from 'boring-avatars';
import {Box} from 'grommet';

// Useful constants
import {AVATAR_VARIANT, AVATAR_COLORS} from '../../Constants';

/**
 * A selectable avatar with grow behaviour
 * @param {SelectableAvatar} props component props
 * @return {ReactElement}
 */
const SelectableAvatar = (props: Components.SelectableAvatar): ReactElement => {
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

export default SelectableAvatar;
