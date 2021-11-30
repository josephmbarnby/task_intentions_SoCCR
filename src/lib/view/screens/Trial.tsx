// React import
import React, {ReactElement, useRef, useState} from 'react';

// UI components
import {Box, Grid, Heading, ThemeContext} from 'grommet';

// Styling
import {Theme} from '../Theme';

// Custom components
import {Option} from '../components/Option';
import {PlayerAvatar} from '../components/PlayerAvatar';

// Custom types
import {TrialProps} from '../../types/typing';

// Logging library
import consola from 'consola';

// Configuration
import {Configuration} from '../../../Configuration';

/**
 * Generate the choices grid with options
 * @param {any} props collection of props
 * @return {ReactElement}
 */
export function Trial(props: TrialProps): ReactElement {
  // Configure the state for participant and partner points
  const defaultHeader = props.display === 'playerChoice' ?
      'How will you split the points?' :
      'How will your parter split the points?';

  const [
    participantPoints,
    setParticipantPoints,
  ] = useState(props.participantPoints);
  const [
    partnerPoints,
    setPartnerPoints,
  ] = useState(props.partnerPoints);
  const [
    trialHeader,
    setTrialHeader,
  ] = useState(defaultHeader);

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
   * @param {Function} headerStateFunction function
   */
  function selectionHandler(
      option: 'Option 1' | 'Option 2',
      headerStateFunction: (header: string) => void,
  ) {
    // Get the references to the nodes
    const optionOneNode = refs.optionOne.current as HTMLElement;
    const optionTwoNode = refs.optionTwo.current as HTMLElement;

    // Check the stage of the trial
    switch (props.display) {
      case 'playerChoice': {
        // First stage of trials: participant selecting the option
        // they want for points
        consola.info(`Selection for option '${props.display}'`);

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

          // End the trial
          props.endTrial(option);
        }, 1000);
        break;
      }
      case 'playerGuess': {
        // Second stage of trials: participant selecting the option
        // they think their opponent will select

        // Get the selected node object
        const selectedNode =
            option === 'Option 1' ? optionOneNode : optionTwoNode;
        const unselectedNode =
            selectedNode === optionOneNode ? optionTwoNode : optionOneNode;
        const correctSelection = option === props.answer;

        if (correctSelection === true) {
          headerStateFunction('Correct!');
        } else {
          headerStateFunction('Incorrect.');
        }

        // Timeout to change the color of the selected answer
        // and the opacity of the unselected answer
        window.setTimeout(() => {
          selectedNode.style.background =
              correctSelection ?
              Theme.global.colors.correct :
              Theme.global.colors.incorrect;
          unselectedNode.style.opacity = '0';

          // Disable selections
          optionOneNode.style.pointerEvents = 'none';
          optionTwoNode.style.pointerEvents = 'none';

          // Set a timeout to reset view and end the trial
          window.setTimeout(() => {
            // Reset the styling
            optionOneNode.style.opacity = '1';
            optionTwoNode.style.opacity = '1';
            optionOneNode.style.pointerEvents = 'auto';
            optionTwoNode.style.pointerEvents = 'auto';
            optionOneNode.style.background =
                Theme.global.colors.optionBackground;
            optionTwoNode.style.background =
                Theme.global.colors.optionBackground;

            // Reset the header state
            setTrialHeader(defaultHeader);

            // End the trial
            props.endTrial(option);
          }, 3000);
        }, 250);
        break;
      }
    }
  }

  return (
    <ThemeContext.Extend value={Theme}>
      <Box justify='center'>
        <Heading textAlign='center' fill>
          {trialHeader}
        </Heading>
        <Grid
          rows={['flex', 'flex']}
          columns={['medium', 'large', 'medium']}
          gap='small'
          justifyContent='center'
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
                  props.options.one.participant,
                  props.options.one.partner,
              );
              selectionHandler('Option 1', setTrialHeader);
            }}
            className='grow'
            round
            background='optionBackground'
          >
            <Option
              optionKey='optionOne'
              optionName='Option 1'
              pointsParticipant={props.options.one.participant}
              pointsParter={props.options.one.partner}
            />
          </Box>

          <Box
            gridArea='choiceTwoArea'
            ref={refs.optionTwo}
            onClick={() => {
              addPoints(
                  props.options.two.participant,
                  props.options.two.partner
              );
              selectionHandler('Option 2', setTrialHeader);
            }}
            className='grow'
            round
            background='optionBackground'
          >
            <Option
              optionKey='optionTwo'
              optionName='Option 2'
              pointsParticipant={props.options.two.participant}
              pointsParter={props.options.two.partner}
            />
          </Box>

          {/* Partner's Avatar */}
          <PlayerAvatar
            gridArea='partnerArea'
            name='Partner'
            points={partnerPoints}
            avatar={Configuration.partners[0]}
          />
        </Grid>
      </Box>
    </ThemeContext.Extend>
  );
}
