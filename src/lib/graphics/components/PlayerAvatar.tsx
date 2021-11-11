// React import
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Grid, Heading} from 'grommet';

// Other imports
import TextTransition, {presets} from 'react-text-transition';
import Avatar from 'boring-avatars';

// Paramters
import {AVATAR_VARIANT, COLORS} from '../../Parameters';

/**
 * Generate a PlayerAvatar component
 * @param {any} props component props
 * @return {ReactElement}
 */
export function PlayerAvatar(props: {
  gridArea: string,
  name: string,
  points: number,
  avatar: string,
}): ReactElement {
  return (
    <Box
      gridArea={props.gridArea}
      background='neutral-3'
      round
      justify='center'
      align='center'
      direction='row-responsive'
      id='playerInfo'
      margin={{left: 'small'}}
    >
      <Grid
        rows={['flex', 'flex', 'flex']}
        columns={['flex']}
        gap='xsmall'
        areas={[
          {name: 'playerNameArea', start: [0, 0], end: [0, 0]},
          {name: 'playerAvatarArea', start: [0, 1], end: [0, 1]},
          {name: 'playerPointsArea', start: [0, 2], end: [0, 2]},
        ]}
        pad='small'
      >
        <Box
          align='center'
          animation={['pulse']}
          gridArea='playerAvatarArea'
          alignSelf='center'
        >
          <Avatar
            size={128}
            name={props.avatar}
            variant={AVATAR_VARIANT}
            colors={COLORS}
          />
        </Box>
        <Box align='center' gridArea='playerNameArea' alignSelf='center'>
          <Heading>{props.name}</Heading>
        </Box>
        <Box align='center' gridArea='playerPointsArea' alignSelf='center'>
          <Heading level={2}>
            Points:&nbsp;
            <TextTransition
              text={props.points}
              springConfig={presets.wobbly}
              inline={true}
            />
          </Heading>
        </Box>
      </Grid>
    </Box>
  );
}
