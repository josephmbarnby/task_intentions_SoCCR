// React import
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Heading} from 'grommet';
import Avatar from 'boring-avatars';

// Configuration
import {Configuration} from '../../../Configuration';

// Constants
import {AVATAR_VARIANT, COLORS} from '../../Constants';

/**
 * Generate layout of Matched Screen
 * @return {any}
 */
export function Matched(): ReactElement {
  return (
    <Box align='center' animation={['fadeIn']}>
      <Heading>Partner found!</Heading>
      <Avatar
        size={240}
        name={Configuration.partners[0]}
        variant={AVATAR_VARIANT}
        colors={COLORS}
      />
    </Box>
  );
}
