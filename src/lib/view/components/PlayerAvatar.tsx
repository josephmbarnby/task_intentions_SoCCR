// React import
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Grid, Heading, ThemeContext} from 'grommet';
import {Money} from 'grommet-icons';

// Other imports
import TextTransition, {presets} from 'react-text-transition';
import Avatar from 'boring-avatars';

// Styling
import {Theme} from '../Theme';

// Parameters
import {AVATAR_VARIANT, COLORS} from '../../Constants';

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
    <ThemeContext.Extend
      value={
        Theme
      }
    >
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
          rows={['small', 'flex', 'small']}
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
          >
            <Avatar
              size={128}
              name={props.avatar}
              variant={AVATAR_VARIANT}
              colors={COLORS}
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
    </ThemeContext.Extend>
  );
}
