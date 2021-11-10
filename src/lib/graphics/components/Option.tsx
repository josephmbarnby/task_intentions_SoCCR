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
  pointsPPT: number,
  pointsParter: number,
}): ReactElement {
  return (
    <div>
      <Box
        justify='center'
        alignContent='center'
        fill='horizontal'
      >
        <Heading level={3} fill>{props.optionName}</Heading>
      </Box>
      <Grid
        rows={['flex']}
        columns={['flex', 'flex']}
        gap='small'
        areas={[
          {name: 'pointsYou', start: [0, 0], end: [0, 0]},
          {name: 'pointsPartner', start: [1, 0], end: [1, 0]},
        ]}
        id={props.optionKey}
        fill='vertical'
      >
        <Box
          gridArea='pointsYou'
          justify='center'
          alignSelf='center'
        >
          <Heading level={3}>{props.pointsPPT}</Heading>
        </Box>

        <Box
          gridArea='pointsPartner'
          justify='center'
          alignSelf='center'
        >
          <Heading level={3}>{props.pointsParter}</Heading>
        </Box>
      </Grid>
    </div>
  );
}
