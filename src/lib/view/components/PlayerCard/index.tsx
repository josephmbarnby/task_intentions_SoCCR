// React
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Grid, Heading} from 'grommet';
import {Money} from 'grommet-icons';

// Other imports
import TextTransition, {presets} from 'react-text-transition';
import Avatar from 'boring-avatars';

// Configuration
import {Configuration} from '../../../Configuration';

/**
 * Generate a PlayerCard component
 * @param {PlayerCard} props component props
 * @return {ReactElement}
 */
const PlayerCard = (props: Components.PlayerCard): ReactElement => {
  return (
    <Box
      gridArea={props.gridArea}
      background='avatarBackground'
      round
      justify='center'
      align='center'
      direction='row-responsive'
      id='playerInfo'
      margin={{left: 'small', right: 'small'}}
    >
      <Grid
        rows={['xsmall', 'flex', 'xsmall']}
        columns={['auto']}
        areas={[
          {name: 'playerNameArea', start: [0, 0], end: [0, 0]},
          {name: 'PlayerCardArea', start: [0, 1], end: [0, 1]},
          {name: 'playerPointsArea', start: [0, 2], end: [0, 2]},
        ]}
      >
        <Box
          align='center'
          animation={['pulse']}
          gridArea='PlayerCardArea'
        >
          <Avatar
            size={128}
            name={props.avatar}
            variant={Configuration.avatars.variant}
            colors={Configuration.avatars.colours}
          />
        </Box>
        <Box
          align='center'
          gridArea='playerNameArea'
          alignSelf='center'
        >
          <Heading>{props.name}</Heading>
        </Box>
        <Box
          align='center'
          gridArea='playerPointsArea'
          alignSelf='center'
          direction='row'
          justify='center'
          gap='small'
        >
          <Heading level={1}>
            <TextTransition
              text={props.points}
              springConfig={presets.slow}
            />
          </Heading>
          <Money
            size='large'
            color='pointsIconBackground'
          />
        </Box>
      </Grid>
    </Box>
  );
};

export default PlayerCard;
