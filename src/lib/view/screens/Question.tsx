// React import
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Heading, Text} from 'grommet';

// Custom components
import {RangeSlider} from '../components/RangeSlider';

// Logging library
import consola from 'consola';

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
      <Heading>
        How often do you use your brain?
      </Heading>
      <Text size='large'>
        Adjust the sliders to respond to the questions.
      </Text>
      <RangeSlider
        min={0}
        max={100}
        leftLabel='Not at all'
        rightLabel='All the time'
      />
    </Box>
  );
}
