// React
import React, {ReactElement} from 'react';

// Grommet UI components
import {Grid, Heading} from 'grommet';

/**
 * Generate an Option for the participant to select
 * @param {Option} props collection of props
 * @return {ReactElement}
 */
const Option = (props: Components.Option): ReactElement => {
  return (
    <Grid
      id={props.optionKey}
      rows={['1/2', '1/2']}
      columns={['1/2', '1/2']}
      fill
      pad='xsmall'
      align='center'
      areas={[
        {name: 'participantHeader', start: [0, 0], end: [0, 0]},
        {name: 'partnerHeader', start: [1, 0], end: [1, 0]},
        {name: 'participantPoints', start: [0, 1], end: [0, 1]},
        {name: 'partnerPoints', start: [1, 1], end: [1, 1]},
      ]}
    >
      {/* Participant header */}
      <Heading level={2} size='auto' gridArea='participantHeader'>
        Points for you
      </Heading>

      {/* Partner header */}
      <Heading level={2} size='auto' gridArea='partnerHeader'>
        Points for your partner
      </Heading>

      {/* Participant points */}
      <Heading level={2} gridArea='participantPoints'>
        <b>+{props.pointsParticipant}</b>
      </Heading>

      {/* Partner points */}
      <Heading level={2} gridArea='partnerPoints'>
        <b>+{props.pointsParter}</b>
      </Heading>
    </Grid>
  );
};

export default Option;
