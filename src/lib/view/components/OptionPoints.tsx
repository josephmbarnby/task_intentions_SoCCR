// React import
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Grid, Heading} from 'grommet';
import {Money} from 'grommet-icons';

/**
 * Generate an Option grid
 * @param {any} props collection of props
 * @return {ReactElement}
 */
export function OptionPoints(props: {
  optionKey: string,
  optionName: string,
  pointsParticipant: number,
  pointsParter: number,
}): ReactElement {
  return (
    <Grid
      rows={['flex', 'flex']}
      columns={['flex', 'flex']}
      gap='small'
      areas={[
        {name: 'participantHeader', start: [0, 0], end: [0, 0]},
        {name: 'partnerHeader', start: [1, 0], end: [1, 0]},
        {name: 'participantPoints', start: [0, 1], end: [0, 1]},
        {name: 'partnerPoints', start: [1, 1], end: [1, 1]},
      ]}
      id={props.optionKey}
      fill='vertical'
    >
      {/* Choice header */}
      <Box
        gridArea='participantHeader'
        justify='center'
        alignContent='center'
        fill='horizontal'
      >
        <Heading level={2} fill>Points for you</Heading>
      </Box>

      <Box
        gridArea='partnerHeader'
        justify='center'
        alignContent='center'
        fill='horizontal'
      >
        <Heading level={2} fill>Points for your partner</Heading>
      </Box>

      {/* Participant points */}
      <Box
        gridArea='participantPoints'
        justify='center'
        alignSelf='center'
        align='center'
        direction='row'
        gap='small'
      >
        <Heading>+{props.pointsParticipant}</Heading>
        <Money
          size='large'
          color='pointsIconBackground'
        />
      </Box>

      {/* Partner points */}
      <Box
        gridArea='partnerPoints'
        justify='center'
        alignSelf='center'
        align='center'
        direction='row'
        gap='small'
      >
        <Heading>+{props.pointsParter}</Heading>
        <Money
          size='large'
          color='pointsIconBackground'
        />
      </Box>
    </Grid>
  );
}
