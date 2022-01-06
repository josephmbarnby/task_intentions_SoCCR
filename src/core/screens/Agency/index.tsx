// React
import React, {ReactElement, useState} from 'react';

// Grommet UI components
import {Box, Button, Text} from 'grommet';
import {LinkNext} from 'grommet-icons';

// Custom components
import RangeSlider from '../../components/RangeSlider';

// Constants
const SLIDER_DEFAULT = 50; // Sets the 'thumb' to the middle of the slider

/**
 * Generate layout of Agency Screen (Agency trial)
 * @param {Screens.Agency} props component props
 * @return {ReactElement}
 */
const Agency = (props: Screens.Agency): ReactElement => {
  // Slider states, monitor if they have been interacted with
  // Top slider
  const [sliderMoved, setSliderMoved] = useState(false);
  const [sliderValue, setSliderValue] = useState(SLIDER_DEFAULT);

  return (
    <>
      <Box
        justify='center'
        align='center'
        gap='small'
        animation={['fadeIn']}
      >
        {/* Agency question */}
        <Box width='xlarge'>
          <Text size='xlarge'>
            {'The Brain Development and Disorders lab does not use ' +
            'deception. All participants are real. Nevertheless, ' +
            'for our own purposes, it is helpful to know to what ' +
            'extent you believed that the other player really existed.'}
          </Text>
        </Box>
        <Box width='xlarge'>
          <Text size='xlarge'>
            {'I believed I was playing with a real person.'}
          </Text>
        </Box>
        <RangeSlider
          min={0}
          max={100}
          initial={sliderValue}
          leftLabel='Not at all'
          rightLabel='Totally'
          onChange={() => {
            setSliderMoved(true);
          }}
          setValue={setSliderValue}
        />
      </Box>
      <Button
        primary
        margin={{top: 'large'}}
        color='button'
        label='Continue'
        disabled={
          // Disabled until slider has been interacted with
          sliderMoved === false
        }
        size='large'
        icon={<LinkNext />}
        reverse
        onClick={() => {
          props.selectionHandler(sliderValue);
        }}
      />
    </>
  );
};

export default Agency;
