// React import
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Heading} from 'grommet';

// Custom components
import {getStyledAvatar} from './StyledAvatar';

// Configuration
import {config} from '../../../config';

/**
 * Generate layout of Matched Screen
 * @param {any} props collection of props
 * @return {any}
 */
export function Matched(): ReactElement {
  return (
    <Box align='center' animation={['fadeIn']}>
      <Heading>Matched you with a partner!</Heading>
      {getStyledAvatar(config.partners[0], 240)}
    </Box>
  );
}
