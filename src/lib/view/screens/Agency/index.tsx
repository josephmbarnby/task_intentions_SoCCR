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
    <Box
      justify='center'
      align='center'
      gap='small'
      animation={['fadeIn']}
      flex
      direction='column'
    >
      {/* Agency question */}
      <Box width='xlarge'>
        <Text size='xlarge'>
          {'The Brain Development and Disorders lab does not use ' +
          'deception. All partner decisions are real. Nevertheless, ' +
          'for our own purposes, it is helpful to know to what ' +
          'extent you believed that the other player really existed.'}
        </Text>
        <div className='instructions-container'>
          <h1>Instructions</h1>
          {/* Overview */}
          <h2>
            Overview
          </h2>
          <p>
            During this task you and a partner will be choosing how
            to divide a sum of points between each other.
            Your ID will not be revealed to your partner,
            and you won't be able to see the ID of your partner.
          </p>
          <p>
            This game consists of three stages.
            You are matched with a <b>different</b> partner before each stage.
          </p>
          <br />
        </div>
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
        leftLabel='Disagree'
        rightLabel='Agree'
        onChange={() => {
          setSliderMoved(true);
        }}
        setValue={setSliderValue}
      />
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
    </Box>
  );
};

export default Agency;
