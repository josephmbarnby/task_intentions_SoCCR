// React
import React, {ReactElement} from 'react';

// Components
import {Avatar, Box} from 'grommet';
import {User} from 'grommet-icons';

/**
 * A selectable avatar with grow behaviour
 * @param {any} props component props
 * @return {ReactElement}
 */
const IconAvatar = (props: Components.IconAvatar): ReactElement => {
  return (
    <Box
      margin='medium'
      round={{size: '50%'}}
      className={
        props.name === props.state ? 'selectable selected' : 'selectable'
      }
    >
      <Avatar
        background={props.background}
        size='3xl'
        onClick={() => {
          // Call the state update function with the name
          props.setState(props.name);
        }}
      >
        <User size='large'/>
        {props.name}
      </Avatar>
    </Box>
  );
};

export default IconAvatar;
