// React
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Grid, Heading} from 'grommet';
import {Money} from 'grommet-icons';

// Other imports
import TextTransition, {presets} from 'react-text-transition';
import Avatar from 'boring-avatars';

// Parameters
import {AVATAR_VARIANT, AVATAR_COLORS} from '../../Constants';

// Types
declare type PlayerAvatar = {
  gridArea: string;
  name: string;
  points: number;
  avatar: string;
};

/**
 * Generate a PlayerAvatar component
 * @param {PlayerAvatar} props component props
 * @return {ReactElement}
 */
const PlayerAvatar = (props: PlayerAvatar): ReactElement => {
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
        rows={['1/3', '1/3', '1/3']}
        columns={['flex']}
        areas={[
          {name: 'playerNameArea', start: [0, 0], end: [0, 0]},
          {name: 'playerAvatarArea', start: [0, 1], end: [0, 1]},
          {name: 'playerPointsArea', start: [0, 2], end: [0, 2]},
        ]}
      >
        <Box
          align='center'
          animation={['pulse']}
          gridArea='playerAvatarArea'
        >
          <Avatar
            size={128}
            name={props.avatar}
            variant={AVATAR_VARIANT}
            colors={AVATAR_COLORS}
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

export default PlayerAvatar;
