// React import
import React, {ReactElement} from 'react';
import ReactCSSTransitionGroup from 'react-transition-group';

// Grommet UI components
import {Box, Grid, Heading} from 'grommet';

// Text Transition component
import TextTransition, {presets} from 'react-text-transition';

// Custom components
import {getStyledAvatar} from './StyledAvatar';
import {Option} from './Option';

// Configuration
import {config} from '../../../config';

/**
 * Generate the choices grid with options
 * @param {any} props collection of props
 * @return {ReactElement}
 */
export function Choice(props: {
  avatar: number; points: number;
  rowData: {
    // eslint-disable-next-line camelcase
    Option1_PPT: number;
    // eslint-disable-next-line camelcase
    Option1_Partner: number;
    // eslint-disable-next-line camelcase
    Option2_PPT: number;
    // eslint-disable-next-line camelcase
    Option2_Partner: number;
  };
  buttonHandler: (selection: string) => void; }): ReactElement {
  return (
    <>
      {/* // <ReactCSSTransitionGroup
      //   transitionName="example"
      //   transitionAppear={true}
      //   transitionAppearTimeout={500}
      //   transitionEnter={false}
      //   transitionLeave={false}
      // > */}
      <Grid
        rows={['small']}
        columns={['medium', 'medium']}
        gap='medium'
        fill={true}
        margin={
          {
            bottom: 'large',
          }
        }
        areas={[
          {name: 'youArea', start: [0, 0], end: [0, 0]},
          {name: 'partnerArea', start: [1, 0], end: [1, 0]},
        ]}
      >
        {/* Participant's Avatar */}
        <Box
          gridArea='youArea'
          background='brand'
          round
          justify='center'
          align='center'
          direction='row-responsive'
          id='participantInfo'
        >
          <Grid
            rows={['flex', 'flex']}
            columns={['flex', 'flex']}
            gap='xsmall'
            fill={true}
            areas={[
              {name: 'youNameArea', start: [0, 0], end: [0, 0]},
              {name: 'youAvatarArea', start: [1, 0], end: [1, 0]},
              {name: 'youPointsArea', start: [0, 1], end: [1, 1]},
            ]}
            pad='small'
          >
            <Box
              align='center'
              animation={['pulse']}
              gridArea='youAvatarArea'
              alignSelf='center'
            >
              {getStyledAvatar(`${config.avatars[props.avatar - 1]}`, 64)}
            </Box>
            <Box align='center' gridArea='youNameArea' alignSelf='center'>
              <Heading>You</Heading>
            </Box>
            <Box align='center' gridArea='youPointsArea' alignSelf='center'>
              <Heading level={2}>
                Points:&nbsp;
                <TextTransition
                  text={props.points}
                  springConfig={presets.wobbly}
                  inline={true}
                />
              </Heading>
            </Box>
          </Grid>
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
        >
          <Box align='center'>
            <Heading level={2}>Points:</Heading>
          </Box>
          <Box align='center' animation={['pulse']}>
            <Heading level={2}>&nbsp;{props.points}</Heading>
          </Box>
        </Box>
      </Grid>

      <Option
        optionKey='optionOne'
        optionName='Option 1'
        pointsPPT={props.rowData.Option1_PPT}
        pointsParter={props.rowData.Option1_Partner}
        buttonHandler={props.buttonHandler}
      />

      <Option
        optionKey='optionTwo'
        optionName='Option 2'
        pointsPPT={props.rowData.Option2_PPT}
        pointsParter={props.rowData.Option2_Partner}
        buttonHandler={props.buttonHandler}
      />
      {/* </ReactCSSTransitionGroup> */}
    </>
  );
}
