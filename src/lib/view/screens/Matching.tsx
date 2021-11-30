// React import
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Heading, Spinner, ThemeContext, WorldMap} from 'grommet';

// Styling
import {Theme} from '../Theme';

/**
 * Generate layout of Matching Screen
 * @return {ReactElement}
 */
export function Matching(): ReactElement {
  return (
    <ThemeContext.Extend value={Theme}>
      <Box
        justify='center'
        align='center'
        gap='small'
        animation={['fadeIn']}
        fill
      >
        <Heading>Finding you a partner...</Heading>
        <Spinner
          size='large'
          color='avatarBackground'
        />
        <WorldMap
          color='avatarBackground'
          fill='vertical'
        />
      </Box>
    </ThemeContext.Extend>
  );
}
