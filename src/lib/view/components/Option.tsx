// React
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Grid, Heading} from 'grommet';
import {Money} from 'grommet-icons';

/**
 * Generate an Option for the participant to select
 * @param {Components.Option} props collection of props
 * @return {ReactElement}
 */
const Option = (props: Components.Option): ReactElement => {
  return (
    <Grid
      rows={['1/2', '1/2']}
      columns={['1/2', '1/2']}
      areas={[
        {name: 'participantHeader', start: [0, 0], end: [0, 0]},
        {name: 'partnerHeader', start: [1, 0], end: [1, 0]},
        {name: 'participantPoints', start: [0, 1], end: [0, 1]},
        {name: 'partnerPoints', start: [1, 1], end: [1, 1]},
      ]}
      id={props.optionKey}
      responsive
    >
      {/* Choice header */}
      <Box
        gridArea='participantHeader'
        justify='center'
        alignContent='center'
      >
        <Heading level={2} fill size='auto'>
          Points for you
        </Heading>
      </Box>

      <Box
        gridArea='partnerHeader'
        justify='center'
        alignContent='center'
      >
        <Heading level={2} fill size='auto'>
          Points for your partner
        </Heading>
      </Box>

      {/* Participant points */}
      <Box
        gridArea='participantPoints'
        justify='center'
        align='center'
        direction='row'
        gap='small'
      >
        <Heading size='auto'>+{props.pointsParticipant}</Heading>
        <Money
          size='large'
          color='pointsIconBackground'
        />
      </Box>

      {/* Partner points */}
      <Box
        gridArea='partnerPoints'
        justify='center'
        align='center'
        direction='row'
        gap='small'
      >
        <Heading size='auto'>+{props.pointsParter}</Heading>
        <Money
          size='large'
          color='pointsIconBackground'
        />
      </Box>
    </Grid>
  );
};

export default Option;
