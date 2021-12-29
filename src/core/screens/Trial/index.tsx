// React import
import React, {ReactElement, useRef, useState} from 'react';

// UI components
import {Box, Button, Grid, Heading, Layer, Text} from 'grommet';
import {LinkNext} from 'grommet-icons';

// Custom components
import Option from '../../components/Option';
import PlayerAvatar from '../../components/PlayerAvatar';

// Access theme constants directly
import {Theme} from '../../Theme';

// API modules
import {Experiment} from 'crossplatform-jspsych-wrapper';

// Configuration
import {Configuration} from '../../../Configuration';

/**
 * Generate the choices grid with options
 * @param {Screens.Trial} props collection of props
 * @return {ReactElement}
 */
const Trial = (props: Screens.Trial): ReactElement => {
  // Header state
  const defaultHeader = props.display !== 'playerGuess' ?
      'How will you split the points?' :
      'How will your parter split the points?';
  const [
    trialHeader,
    setTrialHeader,
  ] = useState(defaultHeader);

  // Points state
  const [
    participantPoints,
    setParticipantPoints,
  ] = useState(props.participantPoints);
  const [
    partnerPoints,
    setPartnerPoints,
  ] = useState(props.partnerPoints);

  // Selection state
  const [selected, setSelected] = useState('');

  // Overlay state
  const [showOverlay, setShowOverlay] = useState(false);

  // Create references for each Option
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
   * Helper function to end the trial
   * @param {string} option selected option
   */
  function endTrial(option: string): void {
    // Bubble the selection handler
    props.selectionHandler(option);
  }

  /**
   * Update the number of points of the participant and the
   * partner. The update process depends on the phase.
   * @param {'Option 1' | 'Option 2'} option selected option
   */
  function updatePoints(option: 'Option 1' | 'Option 2'): void {
    // Points to apply
    let participantPoints = 0;
    let partnerPoints = 0;
    // Check what Phase is running
    if (props.display !== 'playerGuess') {
      // 'playerChoice' trials simply update the points as required
      // Participant points
      participantPoints =
          option === 'Option 1' ?
            props.options.one.participant :
            props.options.two.participant;

      // Partner points
      partnerPoints =
          option === 'Option 1' ?
            props.options.one.partner :
            props.options.two.partner;
    } else {
      // 'playerGuess' trials update points from the correct choice
      // Participant points
      participantPoints =
          props.answer === 'Option 1' ?
            props.options.one.participant :
            props.options.two.participant;

      // Partner points
      partnerPoints =
          props.answer === 'Option 1' ?
            props.options.one.partner :
            props.options.two.partner;
    }

    // Apply the points
    addPoints(
        participantPoints,
        partnerPoints,
    );

    // Call the selection handler
    selectionHandler(option);
  }

  /**
   * Selection handler
   * @param {'Option 1' | 'Option 2'} option the selected option
   * @param {Function} headerStateFunction function
   */
  function selectionHandler(
      option: 'Option 1' | 'Option 2',
  ) {
    // Update the selection
    setSelected(option);

    // Show the tutorial overlay if enabled
    setShowOverlay(props.isTutorial);

    // Invoke the transition if non-tutorial trial
    if (props.isTutorial === false) {
      transition();
    }
  }

  /**
   * Transition function to end the trial
   */
  function transition() {
    // Hide the overlay if shown
    setShowOverlay(false);

    // Get the references to the nodes
    const optionOneNode = refs.optionOne.current as HTMLElement;
    const optionTwoNode = refs.optionTwo.current as HTMLElement;

    // Disable all pointer events
    optionOneNode.style.pointerEvents = 'none';
    optionTwoNode.style.pointerEvents = 'none';

    // Get the selected node object
    const selectedNode =
        selected === 'Option 1' ? optionOneNode : optionTwoNode;
    const unselectedNode =
        selectedNode === optionOneNode ? optionTwoNode : optionOneNode;
    const correctSelection = selected === props.answer;

    // Check the stage of the trial
    switch (props.display) {
      // Simple choice of the player
      case 'playerChoice':
      case 'playerChoiceTutorial':
      case 'playerChoice2': {
        // Timeout to change the opacity of the options
        window.setTimeout(() => {
          // Hide the unselected option
          unselectedNode.style.opacity = '0';

          window.setTimeout(() => {
            // Hide the selected option
            selectedNode.style.opacity = '0';
          }, 1500);

          // Set a timeout for continuing
          window.setTimeout(() => {
            // Reset the styling
            optionOneNode.style.opacity = '1';
            optionTwoNode.style.opacity = '1';
            optionOneNode.style.pointerEvents = 'auto';
            optionTwoNode.style.pointerEvents = 'auto';

            // End the trial
            endTrial(selected);
          }, 2000);
        }, 250);
        break;
      }

      // Player guessing partner choices, show feedback
      case 'playerGuess':
      case 'playerGuessTutorial': {
        if (correctSelection === true) {
          setTrialHeader('You chose correctly!');
        } else {
          setTrialHeader('You chose incorrectly.');
        }

        // Timeout to change the color of the selected answer
        // and the opacity of the unselected answer
        window.setTimeout(() => {
          // Set the background of the two options
          // depending on the correct selection
          selectedNode.style.background =
              correctSelection ?
              Theme.global.colors.correct :
              Theme.global.colors.incorrect;

          window.setTimeout(() => {
            // Hide the options before trial end
            optionOneNode.style.opacity = '0';
            optionTwoNode.style.opacity = '0';

            optionOneNode.style.background =
                Theme.global.colors.optionBackground;
            optionTwoNode.style.background =
                Theme.global.colors.optionBackground;
          }, 1500);

          // Set a timeout to reset view and end the trial
          window.setTimeout(() => {
            // Reset the styling
            optionOneNode.style.opacity = '1';
            optionTwoNode.style.opacity = '1';
            optionOneNode.style.pointerEvents = 'auto';
            optionTwoNode.style.pointerEvents = 'auto';

            // Reset the header state
            setTrialHeader(defaultHeader);

            // End the trial
            endTrial(selected);
          }, 2000);
        }, 250);
        break;
      }
    }
  }

  /**
   * Generate and return the text to display in the overlay
   * shown in tutorial-type trials
   * @return {ReactElement}
   */
  function overlayText(): ReactElement {
    let text: ReactElement;

    switch (props.display) {
      // Simple choice of the player
      case 'playerChoice':
      case 'playerChoiceTutorial':
      case 'playerChoice2': {
        text = <Text size='large'>
          You chose <b>{selected}</b>. That means
          you get {selected === 'Option 1' ?
              props.options.one.participant :
              props.options.two.participant
          } points and your partner gets {selected === 'Option 1' ?
              props.options.one.partner :
              props.options.two.partner
          } points.
        </Text>;
        break;
      }
      case 'playerGuess':
      case 'playerGuessTutorial': {
        text = <Text size='large'>
          {selected === props.answer ? 'Correct! ' : 'Incorrect. '}
          Your partner chose <b>{props.answer}</b>. That means
          you get {props.answer === 'Option 1' ?
              props.options.one.participant :
              props.options.two.participant
          } points and your partner gets {props.answer === 'Option 1' ?
              props.options.one.partner :
              props.options.two.partner
          } points.
        </Text>;
        break;
      }
    }

    return text;
  }

  // Get the participant's and the partner's avatars
  const experiment = (window['Experiment'] as Experiment);

  // Participant avatar
  const participantAvatar =
      Configuration.avatars[
          experiment.getGlobalStateValue('participantAvatar')
      ];

  // Partner avatar
  let partnerAvatar: string;
  if (props.display.endsWith('Tutorial')) {
    partnerAvatar = 'example';
  } else {
    // Get the global state of the partner avatar
    partnerAvatar =
        Configuration.partners[
            experiment.getGlobalStateValue('partnerAvatar')
        ];

    // Update state to refresh partner avatar at next match screen
    if (experiment.getGlobalStateValue('refreshPartner') === false) {
      experiment.setGlobalStateValue('refreshPartner', true);
    }
  }

  return (
    <Box justify='center' align='center' overflow='hidden'>
      <Heading textAlign='center' fill size='auto' margin='xsmall'>
        {trialHeader}
      </Heading>
      <Grid
        rows={['flex', 'flex']}
        columns={['flex', '1/2', 'flex']}
        gap='small'
        margin='xsmall'
        areas={[
          {name: 'playerArea', start: [0, 0], end: [0, 1]},
          {name: 'choiceOneArea', start: [1, 0], end: [1, 0]},
          {name: 'choiceTwoArea', start: [1, 1], end: [1, 1]},
          {name: 'partnerArea', start: [2, 0], end: [2, 1]},
        ]}
      >
        {/* Participant's Avatar */}
        <PlayerAvatar
          gridArea='playerArea'
          name='You'
          points={participantPoints}
          avatar={participantAvatar}
        />

        <Box
          gridArea='choiceOneArea'
          ref={refs.optionOne}
          onClick={() => {
            updatePoints('Option 1');
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
            updatePoints('Option 2');
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
          avatar={partnerAvatar}
        />
      </Grid>

      {/* Tutorial overlay */}
      {showOverlay &&
        <Layer>
          <Box pad='small' align='center'>
            <Heading size='auto'>This is an example trial.</Heading>
            {overlayText()}
            {/* Continue button */}
            <Button
              primary
              color='button'
              label='Continue'
              size='large'
              margin='medium'
              icon={<LinkNext />}
              reverse
              onClick={() => {
                // Invoke the inter-trial transition
                transition();
              }}
            />
          </Box>
        </Layer>
      }
    </Box>
  );
};

export default Trial;
