// React import
import React, {ReactElement} from 'react';

// Grommet UI components
import {Box, Heading, Layer, Spinner, WorldMap} from 'grommet';

// Request
import axios from 'axios';

/**
 * Generate layout of Matching Screen
 * @return {ReactElement}
 */
const Matching = (): ReactElement => {
  // Launch request
  axios.get('http://localhost:8080/api/compute', {
    params: {
      id: 123456,
      responses: JSON.stringify([
        {optionOne: 1, optionTwo: 2},
        {optionOne: 1, optionTwo: 2},
        {optionOne: 1, optionTwo: 2},
        {optionOne: 1, optionTwo: 2},
        {optionOne: 1, optionTwo: 2},
        {optionOne: 1, optionTwo: 2},
        {optionOne: 1, optionTwo: 2},
        {optionOne: 1, optionTwo: 2},
      ]),
    },
  })
      .then((response) => {
        if (response.data) {
          console.debug(`Response:`, {
            id: parseInt(response.data.id[0]),
            responses: JSON.parse(response.data.responses),
          });
        } else {
          console.warn('No data received...');
        }
      })
      .catch((error) => {
        console.debug(`Error:`, error);
      })
      .then(() => {
        console.debug(`Finished`);
      });

  return (
    <>
      <WorldMap color='map' fill='horizontal' />
      <Layer plain full>
        <Box
          justify='center'
          align='center'
          gap='small'
          fill
        >
          <Heading
            level='1'
            fill
          >
            Finding you a partner...
          </Heading>
          <Spinner
            size='large'
            color='avatarBackground'
          />
        </Box>
      </Layer>
    </>
  );
};

export default Matching;
