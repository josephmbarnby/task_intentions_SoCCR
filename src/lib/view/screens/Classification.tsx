// React import
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Button, Text, ThemeContext} from 'grommet';
import {LinkNext} from 'grommet-icons';

// Custom components
import {ClassificationAvatar} from '../components/ClassificationAvatar';

// Theme
import {Theme} from '../Theme';

/**
 * Generate layout of Classification Screen (Classification trial)
 * @param {ClassificationProps} props component props
 * @return {ReactElement}
 */
export function Classification(props: ClassificationProps): ReactElement {
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
        <ClassificationAvatar
          key={avatarName}
          name={avatarName}
          background={Theme.global.colors.partners[avatarName.toLowerCase()]}
          state={classification}
          setState={setClassification}
        />
    );
  }

  return (
    <ThemeContext.Extend value={Theme}>
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
    </ThemeContext.Extend>
  );
}
