// React import
import React, {ReactElement, useState} from 'react';

// Grommet UI components
import {Box, Button, defaultProps, Heading, Text, ThemeContext} from 'grommet';
import {LinkNext} from 'grommet-icons';

// Custom components
import {RangeSlider} from '../components/RangeSlider';

// Theme
import {Theme} from '../Theme';

// Logging library
import consola from 'consola';

/**
 * Generate layout of Question Screen (Inference trial)
 * @param {QuestionProps} props component props
 * @return {ReactElement}
 */
export function Question(props: QuestionProps): ReactElement {
  // Slider states, monitor if they have been interacted with
  const [firstMoved, setFirstMoved] = useState(false);
  const [firstValue, setFirstValue] = useState(50);
  const [secondMoved, setSecondMoved] = useState(false);
  const [secondValue, setSecondValue] = useState(50);

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
          initial={firstValue}
          leftLabel='Not at all'
          rightLabel='Totally'
          onChange={() => {
            setFirstMoved(true);
          }}
          setValue={setFirstValue}
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
          initial={secondValue}
          leftLabel='Not at all'
          rightLabel='Totally'
          onChange={() => {
            setSecondMoved(true);
          }}
          setValue={setSecondValue}
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
          props.selectionHandler(firstValue, secondValue);
        }}
      />
    </ThemeContext.Extend>
  );
}
