/**
 * @file 'Card' component used to arrange information about the participant
 * and the partner throughout the game. Contains the name, avatar, and total
 * points obtained by the participant or partner.
 * @author Henry Burgess <henry.burgess@wustl.edu>
 */

// React import
import React, { FC, ReactElement } from "react";

// Grommet UI components
import { Box, Grid, Heading } from "grommet";
import { Money } from "grommet-icons";

// Other imports
import TextTransition, { presets } from "react-text-transition";
import Avatar from "boring-avatars";

// Configuration
import { Configuration } from "src/configuration";

/**
 * @summary Generate a 'Card' component
 * @param {Props.Components.Card} props component props
 * @return {ReactElement} 'Card' component
 */
const Card: FC<Props.Components.Card> = (props: Props.Components.Card): ReactElement => {
  return (
    <Box
      gridArea={props.gridArea}
      background="avatarBackground"
      round
      direction="row-responsive"
      id="playerInfo"
      margin={{ left: "small", right: "small" }}
    >
      <Grid
        rows={["auto", "auto", "auto"]}
        columns={["auto"]}
        justifyContent="center"
        fill
        areas={[
          { name: "playerNameArea", start: [0, 0], end: [0, 0] },
          { name: "PlayerCardArea", start: [0, 1], end: [0, 1] },
          { name: "playerPointsArea", start: [0, 2], end: [0, 2] },
        ]}
      >
        <Box
          align="center"
          alignSelf="center"
          animation={["pulse"]}
          gridArea="PlayerCardArea"
        >
          <Avatar
            size={128}
            name={props.avatar}
            variant={Configuration.avatars.variant as AvatarStyles}
            colors={Configuration.avatars.colours}
          />
        </Box>
        <Box align="center" gridArea="playerNameArea" alignSelf="center">
          <Heading level={1}>{props.name}</Heading>
        </Box>
        <Box
          align="center"
          gridArea="playerPointsArea"
          alignSelf="center"
          direction="row"
          justify="center"
          gap="small"
        >
          <Heading level={1}>
            <TextTransition text={props.points} springConfig={presets.slow} />
          </Heading>
          <Money size="large" color="pointsIconBackground" />
        </Box>
      </Grid>
    </Box>
  );
};

export default Card;
