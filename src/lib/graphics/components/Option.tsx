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
  update: (participant: number, partner: number) => void,
  buttonHandler: (selection: string) => void,
}): ReactElement {
  return (
    <Grid
      rows={['xsmall']}
      columns={['flex', 'flex']}
      fill='horizontal'
      gap='small'
      margin={
        {
          bottom: 'large',
        }
      }
      areas={[
        {name: 'pointsYou', start: [0, 0], end: [0, 0]},
        {name: 'pointsPartner', start: [1, 0], end: [1, 0]},
      ]}
      id={props.optionKey}
      onClick={() => {
        props.update(props.pointsPPT, props.pointsParter);
      }}
    >
      <Box
        gridArea='pointsYou'
        background='light-5'
        justify='center'
        alignSelf='center'
      >
        <Heading level={3}>{props.pointsPPT}</Heading>
      </Box>

      <Box
        gridArea='pointsPartner'
        background='light-5'
        justify='center'
        alignSelf='center'
      >
        <Heading level={3}>{props.pointsParter}</Heading>
      </Box>
    </Grid>
  );
}
