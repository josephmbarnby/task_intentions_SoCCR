// React import
import React, {ReactElement, useState} from 'react';

// Grommet UI components
import {Box, Heading, RangeInput, Text} from 'grommet';

/**
 * Generate a RangeSlider component
 * @param {RangeSliderProps} props component props
 * @return {ReactElement}
 */
export function RangeSlider(props: RangeSliderProps): ReactElement {
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
        <Heading level={2}>
          {props.leftLabel}
        </Heading>
      </Box>
      <RangeInput
        value={value}
        min={props.min}
        max={props.max}
        onChange={(event) => {
          setValue(parseInt(event.target.value));
        }}
      />
      <Box width='medium'>
        <Heading level={2}>
          {props.rightLabel}
        </Heading>
      </Box>
    </Box>
  );
}
