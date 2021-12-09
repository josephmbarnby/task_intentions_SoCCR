// React import
import React, {ReactElement, useState} from 'react';

// Grommet UI components
import {Box, Button, Heading, Text, ThemeContext} from 'grommet';
import {LinkNext} from 'grommet-icons';

// Custom components
import {RangeSlider} from '../components/RangeSlider';

// Theme
import {Theme} from '../Theme';

// Logging library
import consola from 'consola';

// TODO: Link to data collection, store the values of the sliders.
// TODO: Add callback to a handler when the Continue button is clicked.

/**
 * Generate layout of Question Screen (Inference trial)
 * @return {ReactElement}
 */
export function Question(): ReactElement {
  // Slider states, monitor if they have been interacted with
  const [firstMoved, setFirstMoved] = useState(false);
  const [secondMoved, setSecondMoved] = useState(false);

  return (
    <ThemeContext.Extend value={Theme}>
      <Box
        justify='center'
        align='center'
        gap='small'
        animation={['fadeIn']}
      >
        <Heading level={1}>
          Review
        </Heading>
        {/* First question */}
        <Box width='xlarge'>
          <Text size={'xlarge'}>
            {'Please use the slider below to indicate the extent ' +
            'to which you believe your partner\'s decisions are ' +
            'by their desire to earn points in this task overall.'}
          </Text>
        </Box>
        <RangeSlider
          min={0}
          max={100}
          leftLabel='Not at all'
          rightLabel='Totally'
          onChange={() => {
            setFirstMoved(true);
          }}
        />

        {/* Second question */}
        <Box width='xlarge' margin={{top: 'large'}}>
          <Text size={'xlarge'}>
            {'Please use the slider below to indicate the extent ' +
            'to which you believe your partner\'s decisions are ' +
            'by their desire to reduce your points in this task overall.'}
          </Text>
        </Box>
        <RangeSlider
          min={0}
          max={100}
          leftLabel='Not at all'
          rightLabel='Totally'
          onChange={() => {
            setSecondMoved(true);
          }}
        />
      </Box>
      <Button
        primary
        margin={{top: 'large'}}
        color='button'
        label='Continue'
        disabled={
          // Disabled until both sliders have been interacted with
          firstMoved === false || secondMoved === false
        }
        size='large'
        icon={<LinkNext />}
        reverse
        onClick={() => {
          // props.selectionHandler(selectedAvatar);
        }}
      />
    </ThemeContext.Extend>
  );
}
