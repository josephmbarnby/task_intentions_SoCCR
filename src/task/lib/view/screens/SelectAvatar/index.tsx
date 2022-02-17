// React
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Button, Heading} from 'grommet';
import {LinkNext} from 'grommet-icons';

// Configuration
import {Configuration} from '../../../configuration';

// Components
import SelectableAvatar from '../../components/SelectableAvatar';

/**
 * Generic structure for the Avatar Selection Screen
 * @param {Props.Screens.SelectAvatar} props collection of props
 * @return {ReactElement}
 */
const SelectAvatar = (props: Props.Screens.SelectAvatar): ReactElement => {
  // Configure relevant states
  const [selectedAvatar, setAvatar] = React.useState('none');

  const avatars = Configuration.avatars.names.participant;
  const avatarComponents = [];

  for (const avatarName of avatars) {
    avatarComponents.push(
        <SelectableAvatar
          key={avatarName}
          name={avatarName}
          size={128}
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
        direction='row'
        align='center'
        justify='center'
        height='small'
        margin='medium'
      >
        {avatarComponents}
      </Box>

      {/* Continue button */}
      <Button
        id='select-avatar-button'
        primary
        color='button'
        label='Continue'
        disabled={selectedAvatar === 'none'}
        size='large'
        margin='medium'
        icon={<LinkNext />}
        reverse
        onClick={() => {
          props.handler(selectedAvatar);
        }}
      />
    </>
  );
};

export default SelectAvatar;
