/**
 * @file 'Matched' screen presenting an avatar to the participant
 * as their 'partner' for the subsequent phase of the game. The overall game
 * state is queried to ensure that the partner is updated correctly between
 * phases so that each partner will be different, even if the participant
 * has played the game before.
 * @author Henry Burgess <henry.burgess@wustl.edu>
 */

// React import
import React, { FC, ReactElement } from "react";

// Grommet UI components
import { Box, Heading, Layer, WorldMap } from "grommet";
import Avatar from "boring-avatars";

// Logging library
import consola from "consola";

// Configuration
import { Configuration } from "src/configuration";

/**
 * @summary Generate a 'Matched' screen containing a card with the partner
 * of the participant for the subsequent phase of the game.screen
 * @return {ReactElement} 'Matched' 
 */
const Matched: FC = (): ReactElement => {
  // Get the current partner avatar
  const experiment = window.Experiment;
  const currentPartner = experiment.getGlobalStateValue("partnerAvatar");

  // Increment the partner avatar value
  if (experiment.getGlobalStateValue("refreshPartner") === true) {
    // Ensure we keep the index in range
    if (currentPartner + 1 === Configuration.avatars.names.partner.length) {
      // Reset partner to first avatar, ideally we don't want to be here
      consola.warn("Original partner used");
      experiment.setGlobalStateValue("partnerAvatar", 0);
    } else {
      // We can safely go ahead and increment the index
      experiment.setGlobalStateValue("partnerAvatar", currentPartner + 1);
    }
  }

  // Get the updated partner avatar
  const partnerAvatar = experiment.getGlobalStateValue("partnerAvatar");

  return (
    <>
      <WorldMap color="map" fill="horizontal" />
      <Layer plain full>
        <Box justify="center" align="center" gap="small" responsive fill>
          <Heading>Partner found!</Heading>
          <Avatar
            size={240}
            name={Configuration.avatars.names.partner[partnerAvatar]}
            variant={Configuration.avatars.variant as "beam"}
            colors={Configuration.avatars.colours}
          />
        </Box>
      </Layer>
    </>
  );
};

export default Matched;
