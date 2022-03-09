// React import
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Heading, Layer, Paragraph, WorldMap} from 'grommet';

/**
 * Generate layout of End Screen
 * @return {ReactElement}
 */
const End = (): ReactElement => {
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
          <Heading level='1' fill>
            Game finished!
          </Heading>
          <Paragraph margin='small' size='large' fill>
            Thank you for participating in this research.
          </Paragraph>
          <Paragraph margin='small' size='large' fill>
            You will be redirected in 5 seconds.
          </Paragraph>
        </Box>
      </Layer>
    </>
  );
};

export default End;
