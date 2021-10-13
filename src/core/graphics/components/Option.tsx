// React import
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Grid, Heading} from 'grommet';

// Anime.js import
import anime from 'animejs';

/**
 * Generate an Option grid
 * @param {any} props collection of props
 * @return {ReactElement}
 */
export function Option(props: {
  optionKey: string,
  optionName: string,
  pointsPPT: number,
  pointsParter: number,
  buttonHandler: (selection: string) => void,
}): ReactElement {
  return (
    <Grid
      rows={['xsmall']}
      columns={['flex', 'flex']}
      fill='horizontal'
      gap='small'
      margin={
        {
          bottom: 'large',
        }
      }
      areas={[
        {name: 'pointsYou', start: [0, 0], end: [0, 0]},
        {name: 'pointsPartner', start: [1, 0], end: [1, 0]},
      ]}
      className={'grow'}
      id={props.optionKey}
      onClick={() => {
        console.debug(`Clicked ${props.optionName} (${props.optionKey})`);

        // Calculate the distance to the grids
        // Option row
        const optionElement = document.getElementById(props.optionKey);
        const optionY =
            optionElement.getBoundingClientRect().y +
            optionElement.getBoundingClientRect().height / 2;

        // Participant avatar
        const participantElement = document.getElementById('participantInfo');
        const participantY =
            participantElement.getBoundingClientRect().y +
            participantElement.getBoundingClientRect().y / 2;

        // Play the animation
        anime({
          targets: `#${props.optionKey}`,
          translateY: -(optionY - participantY),
          complete: function() {
            optionElement.classList.add('fadeout');
            // Call the selection handler
            props.buttonHandler(props.optionKey);
          },
        });
      }}
    >
      <Box
        gridArea='pointsYou'
        background='light-5'
        justify='center'
        alignSelf='center'
      >
        <Heading level={3}>{props.pointsPPT}</Heading>
      </Box>

      <Box
        gridArea='pointsPartner'
        background='light-5'
        justify='center'
        alignSelf='center'
      >
        <Heading level={3}>{props.pointsParter}</Heading>
      </Box>
    </Grid>
  );
}
