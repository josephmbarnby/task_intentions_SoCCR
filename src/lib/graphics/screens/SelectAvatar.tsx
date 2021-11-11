// React import
import React, {ReactElement} from 'react';

// Grommet UI components
import {
  Box, Button,
  Heading,
} from 'grommet';

// Configuration
import {config} from '../../../config';
import {IntentionsAvatar} from '../components/IntentionsAvatar';

/**
 * Generic structure for the Avatar Selection Screen
 * @param {any} props collection of props
 * @return {ReactElement}
 */
export function SelectAvatar(props: {
  selectionHandler: (value: string) => void;
}): ReactElement {
  // Configure relevant states
  const [selectedAvatar, setAvatar] = React.useState('none');

  const avatars = config.avatars;
  const avatarComponents = [];

  for (const avatarName of avatars) {
    avatarComponents.push(
        <IntentionsAvatar
          key={avatarName}
          size={128}
          name={avatarName}
          state={selectedAvatar}
          stateUpdate={setAvatar}
        />
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
        disabled={selectedAvatar === 'none'}
        onClick={() => {
          props.selectionHandler(selectedAvatar);
        }}
      />
    </div>
  );
}
