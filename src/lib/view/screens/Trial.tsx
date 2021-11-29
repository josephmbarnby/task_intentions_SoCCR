// React import
import React, {ReactElement, useRef, useState} from 'react';

// UI components
import {Box, Grid, Heading} from 'grommet';

// Custom components
import {Option} from '../components/Option';
import {PlayerAvatar} from '../components/PlayerAvatar';

// Custom types
import {TrialProps} from '../../../types/game';

// Configuration
import {Configuration} from '../../../Configuration';
import {STAGES} from '../../Parameters';

/**
 * Generate the choices grid with options
 * @param {any} props collection of props
 * @return {ReactElement}
 */
export function Trial(props: TrialProps): ReactElement {
  // Configure state
  const [participantPoints, setParticipantPoints] = useState(props.points);
  const [partnerPoints, setPartnerPoints] = useState(props.points);

  // Create ref objects
  const refs = {
    optionOne: useRef(null),
    optionTwo: useRef(null),
  };

  /**
   * Update the points state for the participant and the partner
   * @param {number} participant updated points for the participant
   * @param {number} partner updated points for the partner
   */
  function addPoints(participant: number, partner: number): void {
    setParticipantPoints(participantPoints + participant);
    setPartnerPoints(partnerPoints + partner);
  }

  /**
   * Selection handler
   * @param {string} option the selected option
   */
  function selectionHandler(option: string) {
    // Get the references to the nodes
    const optionOneNode = refs.optionOne.current as HTMLElement;
    const optionTwoNode = refs.optionTwo.current as HTMLElement;

    // Check the stage of the trial
    switch (props.display) {
      case 'playerChoice': {
        // First stage of trials: participant selecting the option
        // they want for points

        // Update the styling
        optionOneNode.style.opacity = '0';
        optionTwoNode.style.opacity = '0';
        optionOneNode.style.pointerEvents = 'none';
        optionTwoNode.style.pointerEvents = 'none';

        // Set a timeout for continuing
        window.setTimeout(() => {
          // Reset the styling
          optionOneNode.style.opacity = '1';
          optionTwoNode.style.opacity = '1';
          optionOneNode.style.pointerEvents = 'auto';
          optionTwoNode.style.pointerEvents = 'auto';

          props.endTrial(option);
        }, 1000);
        break;
      }
      case 'playerGuess': {
        // Second stage of trials: participant selecting the option
        // they think their opponent will select

        // Update the styling
        optionOneNode.style.opacity = '0';
        optionTwoNode.style.opacity = '0';
        optionOneNode.style.pointerEvents = 'none';
        optionTwoNode.style.pointerEvents = 'none';

        // Set a timeout for continuing
        window.setTimeout(() => {
          // Reset the styling
          optionOneNode.style.opacity = '1';
          optionTwoNode.style.opacity = '1';
          optionOneNode.style.pointerEvents = 'auto';
          optionTwoNode.style.pointerEvents = 'auto';

          props.endTrial(option);
        }, 2000);
        break;
      }
    }
  }

  return (
    <div>
      <Heading
        textAlign='center'
        fill
      >
        {
          props.display === 'playerChoice' ?
            'How will you split the points?' :
            'How will your parter split the points?'
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
        <PlayerAvatar
          gridArea='playerArea'
          name='You'
          points={participantPoints}
          avatar={Configuration.avatars[props.avatar]}
        />

        <Box
          gridArea='choiceOneArea'
          ref={refs.optionOne}
          onClick={() => {
            addPoints(
                props.data.optionOne.participant,
                props.data.optionOne.partner
            );
            selectionHandler('optionOne');
          }}
          className='grow'
          round
          background='neutral-2'
        >
          <Option
            optionKey='optionOne'
            optionName='Option 1'
            pointsParticipant={props.data.optionOne.participant}
            pointsParter={props.data.optionOne.partner}
          />
        </Box>

        <Box
          gridArea='choiceTwoArea'
          ref={refs.optionTwo}
          onClick={() => {
            addPoints(
                props.data.optionTwo.participant,
                props.data.optionTwo.partner
            );
            selectionHandler('optionTwo');
          }}
          className='grow'
          round
          background='neutral-2'
        >
          <Option
            optionKey='optionTwo'
            optionName='Option 2'
            pointsParticipant={props.data.optionTwo.participant}
            pointsParter={props.data.optionTwo.partner}
          />
        </Box>

        {/* Partner's Avatar */}
        <PlayerAvatar
          gridArea='partnerArea'
          name='Partner'
          points={partnerPoints}
          avatar='partner'
        />
      </Grid>
    </div>
  );
}
