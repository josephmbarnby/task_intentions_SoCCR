// React
import React, {ReactElement, useState} from 'react';

// Grommet UI components
import {Box, Heading, RangeInput} from 'grommet';

/**
 * Generate a RangeSlider component
 * @param {Props.Components.RangeSlider} props component props
 * @return {ReactElement}
 */
const RangeSlider = (props: Props.Components.RangeSlider): ReactElement => {
  const [value, setValue] = useState(props.max / 2);
  return (
    <Box
      align='center'
      direction='row'
      justify='between'
      gap='large'
      width='xlarge'
    >
      <Heading level={3}>{props.leftLabel}</Heading>
      <RangeInput
        aria-label='Slider'
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
      <Heading level={3}>{props.rightLabel}</Heading>
    </Box>
  );
};

export default RangeSlider;
