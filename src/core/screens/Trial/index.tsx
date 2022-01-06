// React import
import React, {ReactElement, useRef, useState} from 'react';

// UI components
import {Box, Button, Grid, Heading, Layer, Text} from 'grommet';
import {LinkNext} from 'grommet-icons';
import TextTransition, {presets} from 'react-text-transition';

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
  let defaultHeader = !props.display.startsWith('playerGuess') ?
      'How will you split the points?' :
      'How will your parter split the points?';

  // Update the header if this is a practice
  if (props.isPractice) {
    defaultHeader = `(Practice) ${defaultHeader}`;
  }

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
  const [
    correctCount,
    setCorrectCount,
  ] = useState(0);

  // Overlay visibility state
  const [showOverlay, setShowOverlay] = useState(false);

  // Content of the overlay
  const [
    overlayContent,
    setOverlayContent,
  ] = useState(
      <Text>Oops! There should be content here.</Text>
  );
  let selectedOption = '';

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
    // Update the point totals
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
   * @param {Options} option selected option
   */
  function updatePoints(option: Options): void {
    // Points to apply
    let participantPoints = 0;
    let partnerPoints = 0;
    // Check what Phase is running
    if (!props.display.toLowerCase().includes('guess')) {
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
   * @param {Options} option the selected option
   * @param {Function} headerStateFunction function
   */
  function selectionHandler(option: Options) {
    // Sum the number of correct answers for the phase
    const correctCountInitial = jsPsych.data.get()
        .filter({
          display: props.display,
        })
        .select('correctGuess')
        .sum();
    if (option === props.answer) {
      setCorrectCount(correctCountInitial + 1);
    } else {
      setCorrectCount(correctCountInitial);
    }

    // Update the selected option and the overlay text
    selectedOption = option;
    setOverlayContent(getOverlayContent());

    // Show the practice overlay if enabled
    setShowOverlay(props.isPractice);

    // Invoke the transition if non-practice trial
    if (props.isPractice === false) {
      transition();
    }
  }

  /**
   * Transition function to end the trial
   */
  function transition() {
    // Pull the selection into a function-scoped variable
    const trialSelection = selectedOption;

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
        selectedOption === 'Option 1' ? optionOneNode : optionTwoNode;
    const unselectedNode =
        selectedNode === optionOneNode ? optionTwoNode : optionOneNode;
    const correctSelection = selectedOption === props.answer;

    // Check the stage of the trial
    switch (props.display) {
      // Simple choice of the player
      case 'playerChoice':
      case 'playerChoicePractice':
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
            endTrial(trialSelection);
          }, 2000);
        }, 250);
        break;
      }

      // Player guessing partner choices, show feedback
      case 'playerGuess':
      case 'playerGuessPractice': {
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
            endTrial(trialSelection);
          }, 2000);
        }, 250);
        break;
      }
    }
  }

  /**
   * Generate and return the content to display in the overlay
   * shown in practice-type trials
   * @return {ReactElement}
   */
  function getOverlayContent(): ReactElement {
    let content: ReactElement;

    switch (props.display) {
      // Simple choice of the player
      case 'playerChoice':
      case 'playerChoicePractice':
      case 'playerChoice2': {
        content =
          <Box pad='small' align='center'>
            <Text size='large' margin='medium'>
              You chose <b>{selectedOption}</b>.
            </Text>
            <Text size='large' margin='medium'>
              That means
              you get {selectedOption === 'Option 1' ?
                  props.options.one.participant :
                  props.options.two.participant
              } points and your partner gets {selectedOption === 'Option 1' ?
                  props.options.one.partner :
                  props.options.two.partner
              } points.
            </Text>

            {/* Continue button */}
            <Button
              primary
              color='button'
              label='Next'
              size='large'
              margin='medium'
              icon={<LinkNext />}
              reverse
              onClick={() => {
                // Invoke the inter-trial transition
                transition();
              }}
            />
          </Box>;
        break;
      }
      case 'playerGuess':
      case 'playerGuessPractice': {
        content =
          <Box pad='small' align='center'>
            <Text size='large' margin='medium'>
              {selectedOption === props.answer ? 'Correct! ' : 'Incorrect. '}
              Your partner chose <b>{props.answer}</b>.
            </Text>
            <Text size='large' margin='medium'>
              That means
              you get {props.answer === 'Option 1' ?
                  props.options.one.participant :
                  props.options.two.participant
              } points and your partner gets {props.answer === 'Option 1' ?
                  props.options.one.partner :
                  props.options.two.partner
              } points.
            </Text>

            {/* Continue button */}
            <Button
              primary
              color='button'
              label='Next'
              size='large'
              margin='medium'
              icon={<LinkNext />}
              reverse
              onClick={() => {
                // Invoke the inter-trial transition
                transition();
              }}
            />
          </Box>;
        break;
      }
    }

    return content;
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
  if (props.display.toLowerCase().endsWith('practice')) {
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
    <Grid
      rows={['auto', 'medium', 'auto']}
      columns={['flex', '1/2', 'flex']}
      gap='xsmall'
      margin='auto'
      width={{
        width: 'auto',
        max: 'xlarge',
      }}
      areas={[
        {name: 'trialHeader', start: [0, 0], end: [2, 0]},
        {name: 'playerArea', start: [0, 1], end: [0, 1]},
        {name: 'choiceArea', start: [1, 1], end: [1, 1]},
        {name: 'partnerArea', start: [2, 1], end: [2, 1]},
        {name: 'counterHeader', start: [0, 2], end: [2, 2]},
      ]}
    >
      <Heading
        textAlign='center'
        fill
        level={2}
        size='auto'
        margin='small'
        gridArea='trialHeader'
      >
        {trialHeader}
      </Heading>

      {/* Participant's Avatar */}
      <PlayerAvatar
        gridArea='playerArea'
        name='You'
        points={participantPoints}
        avatar={participantAvatar}
      />

      {/* Choices */}
      <Box
        gridArea='choiceArea'
        gap='small'
      >
        <Box
          ref={refs.optionOne}
          onClick={() => {
            updatePoints('Option 1');
          }}
          className='grow'
          round
          background='optionBackground'
          fill
        >
          <Option
            optionKey='optionOne'
            optionName='Option 1'
            pointsParticipant={props.options.one.participant}
            pointsParter={props.options.one.partner}
          />
        </Box>

        <Box
          ref={refs.optionTwo}
          onClick={() => {
            updatePoints('Option 2');
          }}
          className='grow'
          round
          background='optionBackground'
          fill
        >
          <Option
            optionKey='optionTwo'
            optionName='Option 2'
            pointsParticipant={props.options.two.participant}
            pointsParter={props.options.two.partner}
          />
        </Box>
      </Box>

      {/* Partner's Avatar */}
      <PlayerAvatar
        gridArea='partnerArea'
        name='Partner'
        points={partnerPoints}
        avatar={partnerAvatar}
      />

      {/* Counter for correct guesses */}
      {/* {props.display.startsWith('playerGuess') && */}
      <Box
        direction='row'
        justify='center'
        margin='xsmall'
        gridArea='counterHeader'
      >
        <Heading level={2} size='auto' margin='xsmall'>
          Correct guesses:&nbsp;
        </Heading>
        <Heading level={2} size='auto' margin='xsmall'>
          <TextTransition
            text={correctCount}
            springConfig={presets.slow}
          />
        </Heading>
      </Box>
      {/* } */}

      {/* Practice overlay */}
      {showOverlay &&
        <Layer>
          <Box pad='small' align='center'>
            <Heading size='auto'>Practice Trial</Heading>
            {/* Display the overlay content */}
            {overlayContent}
          </Box>
        </Layer>
      }
    </Grid>
  );
};

export default Trial;
