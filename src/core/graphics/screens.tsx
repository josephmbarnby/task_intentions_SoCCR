// UI components
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { SimpleGrid, Button, Container, Box } from '@chakra-ui/react';

// Additional components
import Avatar from 'boring-avatars';

function ChoicesGrid(props) {
  return (
    <div>
      <SimpleGrid columns={3} gap={6}>
        <Box
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="3xl"
        >
          Points for you
        </Box>
        <Box
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="3xl"
        >
          Points for your partner
        </Box>
        <Box>
          {/* Empty */}
        </Box>

        {/* First Option */}
        <Box
          fontWeight="regular"
          letterSpacing="wide"
          fontSize="2xl"
          padding={6}
        >
          {props.rowData.Option1_PPT}
        </Box>
        <Box
          fontWeight="regular"
          letterSpacing="wide"
          fontSize="2xl"
          padding={6}
        >
          {props.rowData.Option1_Partner}
        </Box>
        <Box
          fontWeight="regular"
          letterSpacing="wide"
          fontSize="2xl"
          padding={6}
        >
          <Button colorScheme="teal" size="lg">Option 1</Button>
        </Box>

        {/* Second Option */}
        <Box
          fontWeight="regular"
          letterSpacing="wide"
          fontSize="2xl"
          padding={6}
        >
          {props.rowData.Option2_PPT}
        </Box>
        <Box
          fontWeight="regular"
          letterSpacing="wide"
          fontSize="2xl"
          padding={6}
        >
          {props.rowData.Option2_Partner}
        </Box>
        <Box
          fontWeight="regular"
          letterSpacing="wide"
          fontSize="2xl"
          padding={6}
        >
          <Button colorScheme="teal" size="lg">Option 2</Button>
        </Box>
      </SimpleGrid>
    </div>
  );
}

export function ScreenLayout(props: { screen: any; }) {
  return (
    <ChakraProvider>
      {props.screen}
    </ChakraProvider>
  );
}

export function ChoicesScreen(props: { rowData: any }) {
  return (
    <ChoicesGrid rowData={props.rowData} />
  );
}

export function AvatarSelectionScreen() {
  return (
    <Container>
      <Avatar
        size={40}
        name="Maria Mitchell"
        variant="beam"
        colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
      />
    </Container>
  );
}