// React import
import React, {ReactElement} from 'react';

// API modules
import {Experiment} from 'crossplatform-jspsych-wrapper';

// Grommet UI components
import {Box, Button, Grid, Heading, Layer, WorldMap} from 'grommet';
import {LinkNext} from 'grommet-icons';

// Custom components
import PlayerAvatar from '../../components/PlayerAvatar';

// Configuration
import {Configuration} from '../../../Configuration';

// Utility functions
import {calculatePoints} from '../../Functions';

/**
 * Generate layout of Matching Screen
 * @param {Screens.Summary} props screen props
 * @return {ReactElement}
 */
const Summary = (props: Screens.Summary): ReactElement => {
  // Get the participant's and the partner's avatars
  const experiment = (window['Experiment'] as Experiment);
  const participantAvatar = experiment.getGlobalStateValue('participantAvatar');
  const partnerAvatar = experiment.getGlobalStateValue('partnerAvatar');

  // Get the participant's and the partner's points
  const participantPoints = calculatePoints(props.postPhase, 'playerPoints');
  const partnerPoints = calculatePoints(props.postPhase, 'partnerPoints');

  return (
    <>
      <WorldMap
        color='map'
        fill='horizontal'
      />
      <Layer plain full>
        {/* Heading */}
        <Heading
          level='1'
          fill
          alignSelf='center'
          margin={{
            top: 'large',
          }}
        >
          Summary
        </Heading>
        <Box
          alignContent='center'
          fill
        >
          {/* Participant and partner info */}
          <Grid
            rows={['flex']}
            columns={['flex', 'flex']}
            gap='small'
            areas={[
              {name: 'participantArea', start: [0, 0], end: [0, 0]},
              {name: 'partnerArea', start: [1, 0], end: [1, 0]},
            ]}
            fill
          >
            {/* Participant */}
            <PlayerAvatar
              gridArea='participantArea'
              name='You'
              avatar={Configuration.avatars[participantAvatar]}
              points={participantPoints}
            />

            {/* Partner */}
            <PlayerAvatar
              gridArea='partnerArea'
              name='Partner'
              avatar={Configuration.partners[partnerAvatar]}
              points={partnerPoints}
            />
          </Grid>
          {/* Continue button */}
          <Box
            justify='center'
            align='center'
            margin='small'
          >
            <Button
              primary
              color='button'
              label='Continue'
              size='large'
              margin='medium'
              icon={<LinkNext />}
              reverse
              onClick={() => {
                props.selectionHandler();
              }}
            />
          </Box>
        </Box>
      </Layer>
    </>
  );
};

export default Summary;
