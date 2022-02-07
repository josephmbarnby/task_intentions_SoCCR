// React import
import React, {ReactElement} from 'react';

// Logging library
import consola from 'consola';

// Grommet UI components
import {Box, Heading, Layer, Spinner, WorldMap} from 'grommet';

// Request library
import axios from 'axios';

// Configuration
import {Configuration} from '../../../Configuration';

/**
 * Generate layout of Matching Screen
 * @param {Screens.Matching} props collection of props
 * @return {ReactElement}
 */
const Matching = (props: Screens.Matching): ReactElement => {
  const experiment = window['Experiment'];

  // Launch request
  if (props.fetchData) {
    consola.info(`Requesting partner...`);
    axios.get(Configuration.endpoint, {
      params: {
        id: 48294,
        responses: JSON.stringify([
          {ID: 'NA', Trial: 1, ppt1: 6, par1: 6, ppt2: 10, par2: 6,
            Ac: 1, Phase: 1},
          {ID: 'NA', Trial: 2, ppt1: 7, par1: 7, ppt2: 10, par2: 7,
            Ac: 1, Phase: 1},
          {ID: 'NA', Trial: 3, ppt1: 8, par1: 8, ppt2: 10, par2: 8,
            Ac: 1, Phase: 1},
          {ID: 'NA', Trial: 4, ppt1: 6, par1: 6, ppt2: 6, par2: 2,
            Ac: 1, Phase: 1},
          {ID: 'NA', Trial: 5, ppt1: 7, par1: 7, ppt2: 7, par2: 2,
            Ac: 1, Phase: 1},
          {ID: 'NA', Trial: 6, ppt1: 8, par1: 8, ppt2: 8, par2: 2,
            Ac: 1, Phase: 1},
          {ID: 'NA', Trial: 7, ppt1: 6, par1: 2, ppt2: 8, par2: 6,
            Ac: 2, Phase: 1},
          {ID: 'NA', Trial: 8, ppt1: 7, par1: 2, ppt2: 8, par2: 6,
            Ac: 2, Phase: 1},
          {ID: 'NA', Trial: 9, ppt1: 8, par1: 2, ppt2: 9, par2: 6,
            Ac: 2, Phase: 1},
          {ID: 'NA', Trial: 10, ppt1: 12, par1: 8, ppt2: 8, par2: 8,
            Ac: 2, Phase: 1},
          {ID: 'NA', Trial: 11, ppt1: 12, par1: 9, ppt2: 9, par2: 9,
            Ac: 2, Phase: 1},
          {ID: 'NA', Trial: 12, ppt1: 12, par1: 10, ppt2: 10, par2: 10,
            Ac: 2, Phase: 1},
          {ID: 'NA', Trial: 13, ppt1: 8, par1: 5, ppt2: 8, par2: 8,
            Ac: 2, Phase: 1},
          {ID: 'NA', Trial: 14, ppt1: 9, par1: 5, ppt2: 9, par2: 9,
            Ac: 2, Phase: 1},
          {ID: 'NA', Trial: 15, ppt1: 10, par1: 5, ppt2: 10, par2: 10,
            Ac: 2, Phase: 1},
          {ID: 'NA', Trial: 16, ppt1: 10, par1: 6, ppt2: 8, par2: 2,
            Ac: 1, Phase: 1},
          {ID: 'NA', Trial: 17, ppt1: 11, par1: 6, ppt2: 9, par2: 2,
            Ac: 1, Phase: 1},
          {ID: 'NA', Trial: 18, ppt1: 12, par1: 6, ppt2: 10, par2: 2,
            Ac: 1, Phase: 1},
          {ID: 'NA', Trial: 19, ppt1: 4, par1: 4, ppt2: 8, par2: 4,
            Ac: 1, Phase: 1},
          {ID: 'NA', Trial: 20, ppt1: 5, par1: 5, ppt2: 8, par2: 5,
            Ac: 1, Phase: 1},
          {ID: 'NA', Trial: 21, ppt1: 6, par1: 6, ppt2: 8, par2: 6,
            Ac: 1, Phase: 1},
          {ID: 'NA', Trial: 22, ppt1: 5, par1: 5, ppt2: 5, par2: 1,
            Ac: 1, Phase: 1},
          {ID: 'NA', Trial: 23, ppt1: 6, par1: 6, ppt2: 6, par2: 1,
            Ac: 1, Phase: 1},
          {ID: 'NA', Trial: 24, ppt1: 7, par1: 7, ppt2: 7, par2: 1,
            Ac: 1, Phase: 1},
          {ID: 'NA', Trial: 25, ppt1: 5, par1: 1, ppt2: 7, par2: 5,
            Ac: 2, Phase: 1},
          {ID: 'NA', Trial: 26, ppt1: 6, par1: 1, ppt2: 7, par2: 5,
            Ac: 2, Phase: 1},
          {ID: 'NA', Trial: 27, ppt1: 7, par1: 1, ppt2: 8, par2: 5,
            Ac: 2, Phase: 1},
          {ID: 'NA', Trial: 28, ppt1: 10, par1: 6, ppt2: 6, par2: 6,
            Ac: 2, Phase: 1},
          {ID: 'NA', Trial: 29, ppt1: 10, par1: 7, ppt2: 7, par2: 7,
            Ac: 2, Phase: 1},
          {ID: 'NA', Trial: 30, ppt1: 10, par1: 8, ppt2: 8, par2: 8,
            Ac: 2, Phase: 1},
          {ID: 'NA', Trial: 31, ppt1: 6, par1: 3, ppt2: 6, par2: 6,
            Ac: 2, Phase: 1},
          {ID: 'NA', Trial: 32, ppt1: 7, par1: 3, ppt2: 7, par2: 7,
            Ac: 2, Phase: 1},
          {ID: 'NA', Trial: 33, ppt1: 8, par1: 3, ppt2: 8, par2: 8,
            Ac: 2, Phase: 1},
          {ID: 'NA', Trial: 34, ppt1: 9, par1: 5, ppt2: 7, par2: 1,
            Ac: 1, Phase: 1},
          {ID: 'NA', Trial: 35, ppt1: 10, par1: 5, ppt2: 8, par2: 1,
            Ac: 1, Phase: 1},
          {ID: 'NA', Trial: 36, ppt1: 11, par1: 5, ppt2: 9, par2: 1,
            Ac: 1, Phase: 1},
        ]),
      },
    })
        .then((response) => {
          if (response.data) {
            consola.debug(`Received response:`, response.data);
            const id = response.data.id;
            const content = response.data.computed;

            // Parse and store the JSON content
            let phaseData = null;
            try {
              phaseData = JSON.parse(content);
              experiment.setGlobalStateValue(
                  'phaseData',
                  phaseData);
              consola.info(`Success, generated new partner for id:`, id);
            } catch (error) {
              consola.warn(`Error occurred when extracting content:`, error);
            }
          } else {
            consola.warn('No partner data received...');
          }
        })
        .catch((error) => {
          consola.error(error);
        })
        .then(() => {
          consola.info(`Partner request complete`);
          consola.debug(`'phaseData' state value:`,
              experiment.getGlobalStateValue('phaseData'));
        });
  }

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
