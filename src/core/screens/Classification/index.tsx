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

  const partners = [
    'Trying to earn as much money as possible',
    'Trying to stop me from earning points',
    'Trying to share as much money between us as possible',
  ];

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
            {'Overall, what do you think your partner was trying to ' +
              'do with their decisions?'}
          </Text>
        </Box>

        {/* Partner select component */}
        <Select
          options={partners}
          placeholder='Please select'
          onChange={({option}) => {
            setClassification(option);
          }}
          margin={{top: 'large'}}
          size='medium'
        />
      </Box>
      <Button
        primary
        margin={{top: 'large'}}
        color='button'
        label='Continue'
        disabled={
          // Disabled until a partner type has been chosen
          classification === null
        }
        size='large'
        icon={<LinkNext />}
        reverse
        onClick={() => {
          props.selectionHandler(classification);
        }}
      />
    </>
  );
};

export default Classification;
