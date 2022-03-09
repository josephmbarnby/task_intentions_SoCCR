// React
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Button, Select, Paragraph} from 'grommet';
import {LinkNext} from 'grommet-icons';

/**
 * Generate layout of Classification Screen (Classification trial)
 * @param {Props.Screens.Classification} props component props
 * @return {ReactElement}
 */
const Classification = (props: Props.Screens.Classification): ReactElement => {
  // Configure relevant states
  const [classification, setClassification] = React.useState('');
  const [continueDisabled, setContinueDisabled] = React.useState(true);

  const partners = [
    'To earn as much money for themselves as possible',
    'To stop me from earning money',
    'To share the money between us evenly',
  ];

  return (
    <Box
      justify='center'
      align='center'
      gap='small'
      animation={['fadeIn']}
      flex
      direction='column'
    >
      {/* First question */}
      <Paragraph margin='small' size='large' fill>
        Overall, what do you think your partner was trying to do?
      </Paragraph>

      {/* Partner select component */}
      <Box width='large'>
        <Select
          a11yTitle='Select'
          options={partners}
          placeholder='Please select'
          onChange={({option}) => {
            // Enable the continue button
            setContinueDisabled(false);

            // Update the selected classification
            setClassification(option);
          }}
          margin={{top: 'large'}}
          size='large'
        />
      </Box>

      {/* Continue button */}
      <Button
        a11yTitle='Continue'
        primary
        margin={{top: 'large'}}
        color='button'
        label='Continue'
        disabled={
          // Disabled until a partner type has been chosen
          continueDisabled
        }
        size='large'
        icon={<LinkNext />}
        reverse
        onClick={() => {
          props.handler(classification);
        }}
      />
    </Box>
  );
};

export default Classification;
