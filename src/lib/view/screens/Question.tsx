// React import
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Heading} from 'grommet';
import Avatar from 'boring-avatars';

// Logging library
import consola from 'consola';

// API modules
import {Experiment} from '../../API';

// Configuration
import {Configuration} from '../../../Configuration';

// Constants
import {AVATAR_VARIANT, COLORS} from '../../Constants';

/**
 * Generate layout of Question Screen
 * @return {ReactElement}
 */
export function Question(): ReactElement {
  return (
    <Box
      justify='center'
      align='center'
      gap='small'
      animation={['fadeIn']}
      fill
    >
      <Heading>Question</Heading>
    </Box>
  );
}
