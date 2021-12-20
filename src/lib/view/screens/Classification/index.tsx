// React
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Button, Text} from 'grommet';
import {LinkNext} from 'grommet-icons';

// Custom components
import IconAvatar from '../../components/IconAvatar';

/**
 * Generate layout of Classification Screen (Classification trial)
 * @param {Screens.Classification} props component props
 * @return {ReactElement}
 */
const Classification = (props: Screens.Classification): ReactElement => {
  // Configure relevant states
  const [classification, setClassification] = React.useState(null);

  const avatars = [
    'Prosocial',
    'Individualistic',
    'Competitive',
  ];
  const avatarComponents = [];

  for (const avatarName of avatars) {
    avatarComponents.push(
        <IconAvatar
          key={avatarName}
          name={avatarName}
          background={avatarName.toLowerCase()}
          state={classification}
          setState={setClassification}
        />
    );
  }

  return (
    <>
      <Box
        justify='center'
        align='center'
        gap='small'
        animation={['fadeIn']}
      >
        {/* First question */}
        <Box width='xlarge'>
          <Text size={'xlarge'}>
            {'Please select the avatar that you think best ' +
            'represents the playstyle of your partner.'}
          </Text>
        </Box>
        {/* Avatar components */}
        <Box
          flex='grow'
          direction='row-responsive'
          align='center'
          justify='center'
          height='flex'
          margin='small'
        >
          {avatarComponents}
        </Box>
      </Box>
      <Button
        primary
        margin={{top: 'large'}}
        color='button'
        label='Continue'
        disabled={
          // Disabled until a partner type has been chosen
          classification === null
        }
        size='large'
        icon={<LinkNext />}
        reverse
        onClick={() => {
          props.selectionHandler(classification);
        }}
      />
    </>
  );
};

export default Classification;
