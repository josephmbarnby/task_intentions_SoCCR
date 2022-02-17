// React import
import React, {ReactElement} from 'react';

// Logging library
import consola from 'consola';

// Grommet UI components
import {Box, Heading, Layer, Spinner, WorldMap} from 'grommet';

// Request library
import axios from 'axios';

// Configuration
import {Configuration} from '../../../configuration';

/**
 * Generate layout of Matching Screen
 * @param {Props.Screens.Matching} props collection of props
 * @return {ReactElement}
 */
const Matching = (props: Props.Screens.Matching): ReactElement => {
  const experiment = window.Experiment;

  // Launch request
  if (props.fetchData) {
    // Collate data from 'playerChoice' trials
    consola.info(`Collating data...`);
    const dataCollection =
        jsPsych.data.get()
            .filter({
              display: 'playerChoice',
            })
            .values();
    consola.debug(
        `'dataCollection' containing trials with 'display' = 'playerChoice':`,
        dataCollection
    );
    const requestResponses = [];
    for (const row of dataCollection) {
      requestResponses.push({
        ID: 'NA',
        Trial: row.trial,
        ppt1: row.playerPoints_option1,
        par1: row.partnerPoints_option1,
        ppt2: row.playerPoints_option2,
        par2: row.partnerPoints_option2,
        Ac: row.selectedOption_player,
        Phase: 1,
      });
    }
    consola.debug(`Request content 'requestResponses':`, requestResponses);

    // Launch request to endpoint
    consola.info(`Requesting partner...`);
    axios.get(Configuration.endpoint, {
      params: {
        id: 48294,
        responses: JSON.stringify(requestResponses),
      },
    }).then((response) => {
      if (response.data) {
        consola.debug(`Received response:`, response.data);

        // Extract the response data of interest
        const id = response.data.id;
        const content = response.data.computed;

        // Parse and store the JSON content
        let phaseData = null;
        try {
          phaseData = JSON.parse(content);
          // Check the specification of the data first
          if ('PARd' in phaseData && 'PPTd' in phaseData) {
            experiment.setGlobalStateValue('phaseData', phaseData);
            consola.info(`Success, generated new partner for id:`, id);
          } else {
            consola.warn(`Phase data appears to be incomplete`);
          }
        } catch (error) {
          consola.warn(`Error occurred when extracting content:`, error);
        }
      } else {
        consola.warn('No partner data received');
      }
    }).catch((error) => {
      consola.error(error);
    }).then(() => {
      consola.info(`Partner request complete`);
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
