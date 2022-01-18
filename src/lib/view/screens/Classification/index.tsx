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
    <Text
      aria-hidden={true}
      // style={{
      //   display: 'none',
      // }}
    >
      Trying to earn as much money as possible
    </Text>,
    <Text
      aria-hidden={true}
      // style={{
      //   display: 'none',
      // }}
    >
      Trying to stop me from earning points
    </Text>,
    <Text
      aria-hidden={true}
      // style={{
      //   display: 'none',
      // }}
    >
      Trying to share as much money between us as possible
    </Text>,
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
          {'Overall, what do you think your partner was trying to ' +
            'do with their decisions?'}
        </Text>
      </Box>

      {/* Partner select component */}
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
        size='medium'
      />

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
