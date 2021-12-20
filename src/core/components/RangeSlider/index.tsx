// React
import React, {ReactElement, useState} from 'react';

// Grommet UI components
import {Box, Heading, RangeInput} from 'grommet';

// Types
declare type RangeSlider = {
  min: number;
  max: number;
  initial?: number;
  leftLabel: string;
  rightLabel: string;
  onChange?: () => any;
  setValue?: (value: number) => void;
};

/**
 * Generate a RangeSlider component
 * @param {Components.RangeSlider} props component props
 * @return {ReactElement}
 */
const RangeSlider = (props: RangeSlider): ReactElement => {
  const [value, setValue] = useState(props.max / 2);
  return (
    <Box
      align='center'
      direction='row'
      justify='between'
      gap='large'
      width='xlarge'
    >
      <Box width='medium'>
        <Heading level={3}>
          {props.leftLabel}
        </Heading>
      </Box>
      <RangeInput
        value={value}
        min={props.min}
        max={props.max}
        onChange={(event) => {
          const updatedValue = parseInt(event.target.value);
          // Call the given onChange function if provided
          if (typeof props.onChange !== 'undefined') {
            props.onChange();
          }

          // Call the given setValue function if provided
          if (typeof props.setValue !== 'undefined') {
            props.setValue(updatedValue);
          }

          // Update the value of the slider
          setValue(updatedValue);
        }}
      />
      <Box width='medium'>
        <Heading level={3}>
          {props.rightLabel}
        </Heading>
      </Box>
    </Box>
  );
};

export default RangeSlider;
