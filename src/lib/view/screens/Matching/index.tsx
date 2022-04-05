// React import
import React, { ReactElement } from "react";

// Logging library
import consola from "consola";

// Grommet UI components
import { Box, Heading, Layer, Spinner, WorldMap } from "grommet";

// Request library
import Compute from "src/lib/classes/Compute";

// Configuration
import { Configuration } from "src/configuration";

/**
 * Generate layout of Matching Screen
 * @param {Props.Screens.Matching} props collection of props
 * @return {ReactElement}
 */
const Matching = (props: Props.Screens.Matching): ReactElement => {
  const experiment = window.Experiment;

  // Launch request
  if (props.fetchData) {
    const compute = new Compute(Configuration.endpoint);
    // Collate data from 'playerChoice' trials
    consola.info(`Collating data...`);
    const dataCollection = jsPsych.data
      .get()
      .filter({
        display: "playerChoice",
      })
      .values();
    consola.debug(
      `'dataCollection' containing trials with 'display' = 'playerChoice':`,
      dataCollection
    );

    // Format the responses to be sent to the server
    const requestResponses = [];
    for (const row of dataCollection) {
      requestResponses.push({
        ID: "NA",
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

    // Determine the ID of the participant
    let participantID = experiment.getGlobalStateValue("participantID");
    if (participantID === "default") {
      // If no custom participant ID has been specified, generate our own
      consola.debug(`Generating custom participant ID...`);
      participantID = `ppt_${Date.now()}`;
      consola.debug(`Generated participant ID:`, participantID);

      // Update the stored participant ID
      experiment.setGlobalStateValue("participantID", participantID);
    }

    // Launch request to endpoint
    consola.info(`Requesting partner...`);
    compute.submit(
      {
        participantID: participantID,
        participantResponses: JSON.stringify(requestResponses),
      },
      (data: {
        participantID: string[];
        participantParameters: string;
        partnerParameters: string;
        partnerChoices: string;
      }) => {
        // Parse and store the JSON content
        try {
          // Extract the response data of interest
          // Participant data
          const participantID = data.participantID[0];
          const participantParameters = JSON.parse(data.participantParameters);

          // Partner data
          const partnerParameters = JSON.parse(data.partnerParameters);
          const partnerChoices = JSON.parse(data.partnerChoices) as {
            ppt1: number;
            par1: number;
            ppt2: number;
            par2: number;
            Ac: number;
          }[];

          // Check the specification of the data first, require exactly 54 trials
          if (partnerChoices.length > 0) {
            // Store the partner choices
            experiment.setGlobalStateValue("partnerChoices", partnerChoices);

            consola.success(`Generated new partner for ID:`, participantID);

            // Store parameters
            props.handler(participantParameters, partnerParameters);
          } else {
            consola.warn(`Phase data appears to be incomplete`);

            // If we have an error, we need to end the game
            experiment.invokeError(
              new Error("Incomplete response from server")
            );
          }
        } catch (error) {
          consola.warn(`Error occurred when extracting content:`, error);

          // If we have an error, we need to end the game
          experiment.invokeError(new Error("Error extracting content"));
        }
      },
      (error) => {
        // If we have an error, we need to end the game
        experiment.invokeError(error);
      }
    );
  }

  return (
    <>
      <WorldMap color="map" fill="horizontal" />
      <Layer plain full>
        <Box justify="center" align="center" gap="small" fill>
          <Heading level="1" fill>
            Finding you a partner...
          </Heading>
          <Spinner size="large" color="avatarBackground" />
        </Box>
      </Layer>
    </>
  );
};

export default Matching;
