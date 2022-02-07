// React import
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Button, Grid, Heading, Layer, WorldMap} from 'grommet';
import {LinkNext} from 'grommet-icons';

// Custom components
import PlayerCard from '../../components/PlayerCard';

// Configuration
import {Configuration} from '../../../Configuration';

// Utility functions
import {calculatePoints} from '../../../Functions';

/**
 * Generate layout of Matching Screen
 * @param {Screens.Summary} props screen props
 * @return {ReactElement}
 */
const Summary = (props: Screens.Summary): ReactElement => {
  // Get the participant's and the partner's avatars
  const experiment = window.Experiment;
  const participantAvatar = experiment.getGlobalStateValue('participantAvatar');
  const partnerAvatar = experiment.getGlobalStateValue('partnerAvatar');

  // Get the participant's and the partner's points
  const participantPoints = calculatePoints(
      props.postPhase,
      'playerPoints_selected',
  );
  const partnerPoints = calculatePoints(
      props.postPhase,
      'partnerPoints_selected',
  );

  return (
    <>
      <WorldMap color='map' fill='horizontal' />
      <Layer plain>
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
        {/* Participant and partner info */}
        <Grid
          rows={['auto']}
          columns={['medium', 'medium']}
          justifyContent='center'
          gap='small'
          areas={[
            {name: 'participantArea', start: [0, 0], end: [0, 0]},
            {name: 'partnerArea', start: [1, 0], end: [1, 0]},
          ]}
        >
          {/* Participant */}
          <PlayerCard
            gridArea='participantArea'
            name='You'
            avatar={Configuration.avatars.names.participant[participantAvatar]}
            points={participantPoints}
          />

          {/* Partner */}
          <PlayerCard
            gridArea='partnerArea'
            name='Partner'
            avatar={Configuration.avatars.names.partner[partnerAvatar]}
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
      </Layer>
    </>
  );
};

export default Summary;
