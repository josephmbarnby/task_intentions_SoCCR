// React
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Button, Heading, Text} from 'grommet';
import {LinkNext} from 'grommet-icons';

// Configuration
import {Configuration} from '../../../Configuration';

// Components
import PlayerDetails from '../../components/PlayerDetails';

/**
 * Generic structure for the Avatar Selection Screen
 * @param {Screens.SelectAvatar} props collection of props
 * @return {ReactElement}
 */
const SelectAvatar = (props: Screens.SelectAvatar): ReactElement => {
  // Configure relevant states
  const [selectedAvatar, setAvatar] = React.useState('none');

  const avatars = Configuration.avatars;
  const avatarComponents = [];

  for (const avatarName of avatars) {
    avatarComponents.push(
        <PlayerDetails
          key={avatarName}
          size={128}
          name={avatarName}
          state={selectedAvatar}
          setState={setAvatar}
        />
    );
  }

  return (
    <>
      <Heading
        margin='medium'
        fill
      >
        Choose your Avatar!
      </Heading>

      {/* Avatar components */}
      <Box
        flex='grow'
        direction='row-responsive'
        align='center'
        justify='center'
        height='flex'
        margin='medium'
      >
        {avatarComponents}
      </Box>

      {/* Continue button */}
      <Button
        primary
        color='button'
        label='Continue'
        disabled={selectedAvatar === 'none'}
        size='large'
        margin='medium'
        icon={<LinkNext />}
        reverse
        onClick={() => {
          props.selectionHandler(selectedAvatar);
        }}
      />
    </>
  );
};

export default SelectAvatar;
