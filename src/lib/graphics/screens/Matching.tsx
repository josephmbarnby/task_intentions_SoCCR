// React import
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Heading, Spinner, WorldMap} from 'grommet';

/**
 * Generate layout of Matching Screen
 * @return {ReactElement}
 */
export function Matching(): ReactElement {
  return (
    <Box align='center' animation={['fadeIn']}>
      <Heading>Finding you a partner...</Heading>
      <Spinner size='large'/>
      <WorldMap
        color='brand'
      />
    </Box>
  );
}
