// React imports
import React, {ReactElement, useRef} from 'react';

// Components
import Avatar from 'boring-avatars';
import {
  Box,
} from 'grommet';

// Parameters
import {AVATAR_VARIANT, COLORS} from '../../Constants';

/**
 * A selectable avatar with grow behaviour
 * @param {any} props component props
 * @return {ReactElement}
 */
export function OptionAvatar(props: {
  size: number,
  name: string,
  state: string,
  setState: (avatar: string) => void,
}): ReactElement {
  const ref = useRef(null);
  return (
    <Box
      margin='medium'
      ref={ref}
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
        colors={COLORS}
      />
    </Box>
  );
}
