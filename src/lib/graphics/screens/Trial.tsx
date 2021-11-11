// React import
import React, {ReactElement, useRef, useState} from 'react';

// Grommet UI components
import {Box, Grid, Heading} from 'grommet';

// Text Transition component
import TextTransition, {presets} from 'react-text-transition';

// Custom components
import {Option} from '../components/Option';

// Configuration
import {config} from '../../../config';
import Avatar from 'boring-avatars';
import {AVATAR_VARIANT, COLORS, STAGES} from '../../Parameters';

/**
 * Generate the choices grid with options
 * @param {any} props collection of props
 * @return {ReactElement}
 */
export function Trial(props: {
  avatar: number,
  points: number,
  stage: string,
  rowData: {
    // eslint-disable-next-line camelcase
    Option1_PPT: number;
    // eslint-disable-next-line camelcase
    Option1_Partner: number;
    // eslint-disable-next-line camelcase
    Option2_PPT: number;
    // eslint-disable-next-line camelcase
    Option2_Partner: number;
  },
  selectionHandler: (selection: string) => void,
}): ReactElement {
  const [participantPoints, setParticipantPoints] = useState(props.points);
  const [partnerPoints, setPartnerPoints] = useState(props.points);

  const optionOneRef = useRef(null);
  const optionTwoRef = useRef(null);

  /**
   * Update the points state for the participant and the partner
   * @param {number} _participant updated points for the participant
   * @param {number} _partner updated points for the partner
   */
  function updatePointsDisplay(_participant: number, _partner: number): void {
    setParticipantPoints(participantPoints + _participant);
    setPartnerPoints(partnerPoints + _partner);
  }

  return (
    <div>
      <Heading>
        {
          props.stage === STAGES.TRIAL_PHASE_ONE ?
            'Choose an Option' :
            'What will your opponent choose?'
        }
      </Heading>
      <Grid
        rows={['flex', 'flex']}
        columns={['flex', 'large', 'flex']}
        gap='small'
        areas={[
          {name: 'playerArea', start: [0, 0], end: [0, 1]},
          {name: 'choiceOneArea', start: [1, 0], end: [1, 0]},
          {name: 'choiceTwoArea', start: [1, 1], end: [1, 1]},
          {name: 'partnerArea', start: [2, 0], end: [2, 1]},
        ]}
        responsive
      >
        {/* Participant's Avatar */}
        <Box
          gridArea='playerArea'
          background='brand'
          round
          justify='center'
          align='center'
          direction='row-responsive'
          id='participantInfo'
          margin={{right: 'small'}}
        >
          <Grid
            rows={['small', 'flex', 'small']}
            columns={['flex']}
            gap='xsmall'
            areas={[
              {name: 'youNameArea', start: [0, 0], end: [0, 0]},
              {name: 'youAvatarArea', start: [0, 1], end: [0, 1]},
              {name: 'youPointsArea', start: [0, 2], end: [0, 2]},
            ]}
            pad='small'
          >
            <Box
              align='center'
              animation={['pulse']}
              gridArea='youAvatarArea'
              alignSelf='center'
            >
              <Avatar
                size={128}
                name={config.avatars[props.avatar]}
                variant={AVATAR_VARIANT}
                colors={COLORS}
              />
            </Box>
            <Box align='center' gridArea='youNameArea' alignSelf='center'>
              <Heading>You</Heading>
            </Box>
            <Box align='center' gridArea='youPointsArea' alignSelf='center'>
              <Heading level={2}>
                Points:&nbsp;
                <TextTransition
                  text={participantPoints}
                  springConfig={presets.wobbly}
                  inline={true}
                />
              </Heading>
            </Box>
          </Grid>
        </Box>

        <Box
          gridArea='choiceOneArea'
          ref={optionOneRef}
          onClick={() => {
            updatePointsDisplay(
                props.rowData.Option1_PPT,
                props.rowData.Option1_Partner
            );
            const optionOneNode = optionOneRef.current as HTMLElement;
            const optionTwoNode = optionTwoRef.current as HTMLElement;
            optionOneNode.style.opacity = '0';
            optionTwoNode.style.opacity = '0';
            optionOneNode.style.pointerEvents = 'none';
            optionTwoNode.style.pointerEvents = 'none';
            window.setTimeout(() => {
              props.selectionHandler('optionOne');
              optionOneNode.style.opacity = '1';
              optionTwoNode.style.opacity = '1';
              optionOneNode.style.pointerEvents = 'auto';
              optionTwoNode.style.pointerEvents = 'auto';
            }, 1000);
          }}
          className='grow'
          round
          background='neutral-3'
        >
          <Option
            optionKey='optionOne'
            optionName='Option 1'
            pointsParticipant={props.rowData.Option1_PPT}
            pointsParter={props.rowData.Option1_Partner}
          />
        </Box>

        <Box
          gridArea='choiceTwoArea'
          ref={optionTwoRef}
          onClick={() => {
            updatePointsDisplay(
                props.rowData.Option2_PPT,
                props.rowData.Option2_Partner
            );
            const optionOneNode = optionOneRef.current as HTMLElement;
            const optionTwoNode = optionTwoRef.current as HTMLElement;
            optionOneNode.style.opacity = '0';
            optionTwoNode.style.opacity = '0';
            optionOneNode.style.pointerEvents = 'none';
            optionTwoNode.style.pointerEvents = 'none';
            window.setTimeout(() => {
              props.selectionHandler('optionTwo');
              optionOneNode.style.opacity = '1';
              optionTwoNode.style.opacity = '1';
              optionOneNode.style.pointerEvents = 'auto';
              optionTwoNode.style.pointerEvents = 'auto';
            }, 1000);
          }}
          className='grow'
          round
          background='neutral-3'
        >
          <Option
            optionKey='optionTwo'
            optionName='Option 2'
            pointsParticipant={props.rowData.Option2_PPT}
            pointsParter={props.rowData.Option2_Partner}
          />
        </Box>

        {/* Partner's Avatar */}
        <Box
          gridArea='partnerArea'
          background='neutral-1'
          round
          justify='center'
          align='center'
          direction='row-responsive'
          id='partnerInfo'
          margin={{left: 'small'}}
        >
          <Grid
            rows={['small', 'flex', 'small']}
            columns={['flex']}
            gap='xsmall'
            areas={[
              {name: 'friendNameArea', start: [0, 0], end: [0, 0]},
              {name: 'friendAvatarArea', start: [0, 1], end: [0, 1]},
              {name: 'friendPointsArea', start: [0, 2], end: [0, 2]},
            ]}
            pad='small'
          >
            <Box
              align='center'
              animation={['pulse']}
              gridArea='friendAvatarArea'
              alignSelf='center'
            >
              <Avatar
                size={128}
                name={'test'}
                variant={AVATAR_VARIANT}
                colors={COLORS}
              />
            </Box>
            <Box align='center' gridArea='friendNameArea' alignSelf='center'>
              <Heading>Friend</Heading>
            </Box>
            <Box align='center' gridArea='friendPointsArea' alignSelf='center'>
              <Heading level={2}>
                Points:&nbsp;
                <TextTransition
                  text={partnerPoints}
                  springConfig={presets.wobbly}
                  inline={true}
                />
              </Heading>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </div>
  );
}
