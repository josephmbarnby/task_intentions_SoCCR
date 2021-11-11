// React import
import React, {ReactElement, useRef} from 'react';

// Grommet UI components
import {
  Box, Button,
  Card, CardBody, CardFooter,
  Grid, Heading, Image, Select,
} from 'grommet';

// Custom components
import {getStyledAvatar} from './StyledAvatar';

// Configuration
import {config} from '../../../config';

/**
 * Generic structure for the Avatar Selection Screen
 * @param {any} props collection of props
 * @return {any}
 */
export function SelectAvatar(props: {
  avatarSelectionHandler: (value: string) => void;
}): ReactElement {
  // Configure relevant states
  const [value, setValue] = React.useState('none');

  const avatars = config.avatars;
  const avatarComponents = [];

  for (const avatar of avatars) {
    avatarComponents.push(
        <Box
          animation='pulse'
          margin='small'
          onClick={() => {
            setValue(avatar);
          }}
        >
          {getStyledAvatar(avatar, value === avatar ? 172 : 128)}
        </Box>
    );
  }

  return (
    <div>
      <Heading>
        Choose your Avatar!
      </Heading>

      {/* Avatar components */}
      <Box
        flex='grow'
        direction='row-responsive'
        align='center'
        height='medium'
      >
        {avatarComponents}
      </Box>

      {/* Continue button */}
      <Button
        primary
        label='Continue'
        disabled={value === 'none'}
        onClick={() => {
          props.avatarSelectionHandler(value);
        }}
      />
    </div>
  );
}
