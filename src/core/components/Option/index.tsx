// React
import React, {ReactElement} from 'react';

// Grommet UI components
import {Grid, Heading, Text} from 'grommet';

// Types
declare type Option = {
  optionKey: string;
  optionName: string;
  pointsParticipant: number;
  pointsParter: number;
};

/**
 * Generate an Option for the participant to select
 * @param {Components.Option} props collection of props
 * @return {ReactElement}
 */
const Option = (props: Option): ReactElement => {
  return (
    <Grid
      rows={['1/2', '1/2']}
      columns={['1/2', '1/2']}
      pad='xsmall'
      align='center'
      fill
      areas={[
        {name: 'participantHeader', start: [0, 0], end: [0, 0]},
        {name: 'partnerHeader', start: [1, 0], end: [1, 0]},
        {name: 'participantPoints', start: [0, 1], end: [0, 1]},
        {name: 'partnerPoints', start: [1, 1], end: [1, 1]},
      ]}
      id={props.optionKey}
    >
      {/* Choice headers */}
      <Heading level={2} size='auto' gridArea='participantHeader'>
        Points for you
      </Heading>

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
