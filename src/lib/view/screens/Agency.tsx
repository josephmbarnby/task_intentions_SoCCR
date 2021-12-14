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

// Constants
const SLIDER_DEFAULT = 50;

/**
 * Generate layout of Inference Screen (Inference trial)
 * @param {InferenceProps} props component props
 * @return {ReactElement}
 */
export function Agency(props: AgencyProps): ReactElement {
  // Slider states, monitor if they have been interacted with
  // Top slider
  const [firstMoved, setFirstMoved] = useState(false);
  const [firstValue, setFirstValue] = useState(SLIDER_DEFAULT);

  return (
    <ThemeContext.Extend value={Theme}>
      <Box
        justify='center'
        align='center'
        gap='small'
        animation={['fadeIn']}
      >
        <Heading level={1}>
          ?
        </Heading>
        {/* First question */}
        <Box width='xlarge'>
          <Text size={'xlarge'}>
            {'Please use the slider below to indicate the extent ' +
            'to which you believe you were playing against a computer ' +
            'or another human.'}
          </Text>
        </Box>
        <RangeSlider
          min={0}
          max={100}
          initial={firstValue}
          leftLabel='Computer'
          rightLabel='Human'
          onChange={() => {
            setFirstMoved(true);
          }}
          setValue={setFirstValue}
        />
      </Box>
      <Button
        primary
        margin={{top: 'large'}}
        color='button'
        label='Continue'
        disabled={
          // Disabled until slider has been interacted with
          firstMoved === false
        }
        size='large'
        icon={<LinkNext />}
        reverse
        onClick={() => {
          props.selectionHandler(firstValue);
        }}
      />
    </ThemeContext.Extend>
  );
}
