/**
 * @file 'Summary' screen presenting a left card and right card with the
 * avatar's point totals below each image. The left avatar represents the
 * participant, and the right avatar represents the partner. The background
 * consists of a map graphic. Points for the summary are calculated from the
 * phase specified in the `props.postPhase` prop.
 * @author Henry Burgess <henry.burgess@wustl.edu>
 */

// React import
import React, { FC, ReactElement } from "react";

// Logging library
import consola from "consola";

// Grommet UI components
import { Box, Button, Grid, Heading, Layer, WorldMap } from "grommet";
import { LinkNext } from "grommet-icons";

// Custom components
import Card from "src/lib/view/components/Card";

// Configuration
import { Configuration } from "src/configuration";

// Utility functions
import { calculatePoints } from "src/lib/util";

/**
 * @summary Generate a 'Summary' screen with two cards displaying each avatar
 * and point totals above a continue button
 * @param {Props.Screens.Summary} props screen props
 * @return {ReactElement} 'Summary' screen
 */
const Summary: FC<Props.Screens.Summary> = (
  props: Props.Screens.Summary
): ReactElement => {
  consola.debug(`Summary screen for '${props.postPhase}'`);

  // Get the participant's and the partner's avatars
  const experiment = window.Experiment;
  const participantAvatar = experiment.getState().get("participantAvatar");
  const partnerAvatar = experiment.getState().get("partnerAvatar");

  // Get the participant's and the partner's points
  const participantPoints = calculatePoints(
    props.postPhase,
    "playerPoints_selected"
  );
  const partnerPoints = calculatePoints(
    props.postPhase,
    "partnerPoints_selected"
  );

  return (
    <>
      <WorldMap color="map" fill="horizontal" />
      <Layer plain>
        {/* Heading */}
        <Heading
          level="1"
          fill
          alignSelf="center"
          margin={{
            top: "large",
          }}
        >
          Summary
        </Heading>
        {/* Participant and partner info */}
        <Grid
          rows={["auto"]}
          columns={["medium", "medium"]}
          justifyContent="center"
          gap="small"
          areas={[
            { name: "participantArea", start: [0, 0], end: [0, 0] },
            { name: "partnerArea", start: [1, 0], end: [1, 0] },
          ]}
        >
          {/* Participant */}
          <Card
            gridArea="participantArea"
            name="You"
            avatar={Configuration.avatars.names.participant[participantAvatar]}
            points={participantPoints}
          />

          {/* Partner */}
          <Card
            gridArea="partnerArea"
            name="Partner"
            avatar={Configuration.avatars.names.partner[partnerAvatar]}
            points={partnerPoints}
          />
        </Grid>

        {/* Continue button */}
        <Box justify="center" align="center" margin="small">
          <Button
            primary
            color="button"
            label="Continue"
            size="large"
            margin="medium"
            icon={<LinkNext />}
            reverse
            onClick={() => {
              props.handler();
            }}
          />
        </Box>
      </Layer>
    </>
  );
};

export default Summary;