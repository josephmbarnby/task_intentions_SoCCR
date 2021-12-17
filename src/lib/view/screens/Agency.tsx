// React
import React, {ReactElement, useState} from 'react';

// Grommet UI components
import {Box, Button, Text} from 'grommet';
import {LinkNext} from 'grommet-icons';

// Custom components
import RangeSlider from '../components/RangeSlider';

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
    </>
  );
};

export default Agency;
