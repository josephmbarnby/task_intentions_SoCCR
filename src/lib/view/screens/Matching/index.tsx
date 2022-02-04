// React import
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Heading, Layer, Spinner, WorldMap} from 'grommet';

/**
 * Generate layout of Matching Screen
 * @return {ReactElement}
 */
const Matching = (): ReactElement => {
  return (
    <>
      <WorldMap color='map' fill='horizontal' />
      <Layer plain full>
        <Box
          justify='center'
          align='center'
          gap='small'
          fill
        >
          <Heading
            level='1'
            fill
          >
            Finding you a partner...
          </Heading>
          <Spinner
            size='large'
            color='avatarBackground'
          />
        </Box>
      </Layer>
    </>
  );
};

export default Matching;
