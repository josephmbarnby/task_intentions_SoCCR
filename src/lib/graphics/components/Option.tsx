// React import
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Grid, Heading} from 'grommet';

/**
 * Generate an Option grid
 * @param {any} props collection of props
 * @return {ReactElement}
 */
export function Option(props: {
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
        {name: 'optionHeader', start: [0, 0], end: [1, 0]},
        {name: 'pointsYou', start: [0, 1], end: [0, 1]},
        {name: 'pointsPartner', start: [1, 1], end: [1, 1]},
      ]}
      id={props.optionKey}
      fill='vertical'
    >
      {/* Choice header */}
      <Box
        gridArea='optionHeader'
        justify='center'
        alignContent='center'
        fill='horizontal'
      >
        <Heading level={2} fill>{props.optionName}</Heading>
      </Box>

      {/* Participant points */}
      <Box
        gridArea='pointsYou'
        justify='center'
        alignSelf='center'
      >
        <Heading>+{props.pointsParticipant}</Heading>
      </Box>

      {/* Partner points */}
      <Box
        gridArea='pointsPartner'
        justify='center'
        alignSelf='center'
      >
        <Heading>+{props.pointsParter}</Heading>
      </Box>
    </Grid>
  );
}
