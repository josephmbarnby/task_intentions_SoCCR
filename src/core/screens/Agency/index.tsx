// React
import React, {ReactElement, useState} from 'react';

// Grommet UI components
import {Box, Button, Text} from 'grommet';
import {LinkNext} from 'grommet-icons';

// Custom components
import RangeSlider from '../../components/RangeSlider';

// Constants
const SLIDER_DEFAULT = 50;

/**
 * Generate layout of Agency Screen (Agency trial)
 * @param {Screens.Agency} props component props
 * @return {ReactElement}
 */
const Agency = (props: Screens.Agency): ReactElement => {
  // Slider states, monitor if they have been interacted with
  // Top slider
  const [firstMoved, setFirstMoved] = useState(false);
  const [firstValue, setFirstValue] = useState(SLIDER_DEFAULT);

  return (
    <>
      <Box
        justify='center'
        align='center'
        gap='small'
        animation={['fadeIn']}
      >
        {/* First question */}
        <Box width='xlarge'>
          <Text size='xlarge'>
            {'Unlike some other research labs, the Brain Development and ' +
            'Disorders lab does not use deception. All participants ' +
            'are real. Nevertheless, for our own purposes, it is helpful ' +
            'to know to what extent you believed that the other player ' +
            'really existed.'}
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
          initial={firstValue}
          leftLabel='Not at all'
          rightLabel='Totally'
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
    </>
  );
};

export default Agency;
