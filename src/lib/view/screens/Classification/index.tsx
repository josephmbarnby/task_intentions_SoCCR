// React
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Button, Text, Select} from 'grommet';
import {LinkNext} from 'grommet-icons';

/**
 * Generate layout of Classification Screen (Classification trial)
 * @param {Screens.Classification} props component props
 * @return {ReactElement}
 */
const Classification = (props: Screens.Classification): ReactElement => {
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
      <Box width='xlarge'>
        <Text size={'xlarge'}>
          {'Overall, what do you think your partner was trying to do?'}
        </Text>
      </Box>

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
          props.selectionHandler(classification);
        }}
      />
    </Box>
  );
};

export default Classification;
