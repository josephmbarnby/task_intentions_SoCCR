// React import
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Heading} from 'grommet';
import Avatar from 'boring-avatars';

// API modules
import {Experiment} from '../../API';

// Configuration
import {Configuration} from '../../../Configuration';

// Constants
import {AVATAR_VARIANT, COLORS} from '../../Constants';

/**
 * Generate layout of Matched Screen
 * @return {ReactElement}
 */
export function Matched(): ReactElement {
  // Get the current partner avatar
  const experiment = (window['Experiment'] as Experiment);
  const partnerAvatar = experiment.getGlobalStateValue('partnerAvatar');

  // Increment the partner avatar value
  if (partnerAvatar + 1 === Configuration.partners.length) {
    // Reset if index will be out of range
    experiment.setGlobalStateValue('partnerAvatar', 0);
  } else {
    // Otherwise, increment
    experiment.setGlobalStateValue('partnerAvatar', partnerAvatar + 1);
  }

  return (
    <Box
      justify='center'
      align='center'
      gap='small'
      animation={['fadeIn']}
      fill
    >
      <Heading>Partner found!</Heading>
      <Avatar
        size={240}
        name={Configuration.partners[partnerAvatar]}
        variant={AVATAR_VARIANT}
        colors={COLORS}
      />
    </Box>
  );
}
