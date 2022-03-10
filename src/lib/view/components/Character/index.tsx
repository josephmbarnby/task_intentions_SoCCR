// React imports
import React, {ReactElement} from 'react';

// Components
import Avatar from 'boring-avatars';
import {Box} from 'grommet';

// Configuration
import {Configuration} from '@src/configuration';

/**
 * A selectable avatar with grow behaviour
 * @param {Props.Components.Character} props component props
 * @return {ReactElement}
 */
const Character = (props: Props.Components.Character): ReactElement => {
  return (
    <Box
      id={`avatar-${props.name}`}
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
        variant={Configuration.avatars.variant as AvatarStyles}
        colors={Configuration.avatars.colours}
      />
    </Box>
  );
};

export default Character;
