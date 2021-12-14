// React import
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Heading, Layer, Spinner, ThemeContext, WorldMap} from 'grommet';

// Styling
import {Theme} from '../Theme';

/**
 * Generate layout of Matching Screen
 * @return {ReactElement}
 */
export function Matching(): ReactElement {
  return (
    <ThemeContext.Extend value={Theme}>
      <WorldMap
        color='map'
        fill='horizontal'
      />
      <Layer plain full>
        <Box
          justify='center'
          align='center'
          gap='small'
          // animation={['fadeIn']}
          responsive
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
    </ThemeContext.Extend>
  );
}
