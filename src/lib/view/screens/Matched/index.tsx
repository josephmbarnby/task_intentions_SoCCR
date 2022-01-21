// React
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Heading, Layer, WorldMap} from 'grommet';
import Avatar from '../../../../../packages/boring-avatars';

// Logging library
import consola from 'consola';

// API modules
import {Experiment} from 'crossplatform-jspsych-wrapper';

// Configuration
import {Configuration} from '../../../Configuration';

/**
 * Generate layout of Matched Screen
 * @return {ReactElement}
 */
const Matched = (): ReactElement => {
  // Get the current partner avatar
  const experiment = (window['Experiment'] as Experiment);
  const currentPartner = experiment.getGlobalStateValue('partnerAvatar');

  // Increment the partner avatar value
  if (experiment.getGlobalStateValue('refreshPartner') === true) {
    // Ensure we keep the index in range
    if (currentPartner + 1 === Configuration.avatars.names.partner.length) {
      // Reset partner to first avatar, ideally we don't want to be here
      consola.warn('Original partner used');
      experiment.setGlobalStateValue('partnerAvatar', 0);
    } else {
      // We can safely go ahead and increment the index
      experiment.setGlobalStateValue('partnerAvatar', currentPartner + 1);
    }
  }

  // Get the updated partner avatar
  const partnerAvatar = experiment.getGlobalStateValue('partnerAvatar');

  return (
    <>
      <WorldMap
        color='map'
        fill='horizontal'
      />
      <Layer plain full>
        <Box
          justify='center'
          align='center'
          gap='small'
          responsive
          fill
        >
          <Heading>Partner found!</Heading>
          <Avatar
            size={240}
            name={Configuration.avatars.names.partner[partnerAvatar]}
            variant={Configuration.avatars.variant as 'beam'}
            colors={Configuration.avatars.colours}
          />
        </Box>
      </Layer>
    </>
  );
};

export default Matched;
