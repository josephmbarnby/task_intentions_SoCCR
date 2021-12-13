// React import
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Heading} from 'grommet';
import Avatar from 'boring-avatars';

// Logging library
import consola from 'consola';

// API modules
import {Experiment} from 'crossplatform-jspsych-wrapper';

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

  // Increment the partner avatar value
  if (experiment.getGlobalStateValue('refreshPartner') === false) {
    // Set partner to first avatar
    experiment.setGlobalStateValue('partnerAvatar', 0);
  } else {
    // Set partner to second avatar
    experiment.setGlobalStateValue('partnerAvatar', 1);
  }

  // Get the updated partner avatar
  const partnerAvatar = experiment.getGlobalStateValue('partnerAvatar');

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
