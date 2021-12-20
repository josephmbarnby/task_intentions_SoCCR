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
        <Grid
          rows={['auto', 'flex', 'auto']}
          columns={['auto', 'auto']}
          gap='large'
          margin='xlarge'
          areas={[
            {name: 'headingArea', start: [0, 0], end: [1, 0]},
            {name: 'participantArea', start: [0, 1], end: [0, 1]},
            {name: 'partnerArea', start: [1, 1], end: [1, 1]},
            {name: 'continueArea', start: [0, 2], end: [1, 2]},
          ]}
          fill='vertical'
        >
          {/* Heading */}
          <Box
            gridArea='headingArea'
            justify='center'
            align='center'
            fill
          >
            <Heading
              level='1'
              fill
            >
              Summary
            </Heading>
          </Box>

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

          {/* Continue button */}
          <Box
            gridArea='continueArea'
            justify='center'
            align='center'
            fill
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
        </Grid>
      </Layer>
    </>
  );
};

export default Summary;
