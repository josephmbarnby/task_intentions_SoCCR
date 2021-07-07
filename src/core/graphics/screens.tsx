// UI components
import React from 'react';
import { render } from 'react-dom';
import { ChakraProvider, Heading, LinkBox, Select, Skeleton, Spinner, Stack, SimpleGrid, Button, Container, Box } from '@chakra-ui/react';
import { AiOutlineArrowRight } from 'react-icons/ai';

// Additional components
import Avatar from 'boring-avatars';

// Configuration
import { config } from '../../config';
import { spreadsheet } from '../../data';

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
          <Button
            colorScheme="teal"
            size="lg"
            onClick={() => {
              props.buttonHandler('optionOne');
            }}
          >
            Option 1
          </Button>
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
          <Button
            colorScheme="teal"
            size="lg"
            onClick={() => {
              props.buttonHandler('optionTwo');
            }}
          >
            Option 2
          </Button>
        </Box>
      </SimpleGrid>
    </div>
  );
}

function ScreenLayout(props: { screen: any; }) {
  return (
    <ChakraProvider>
      {props.screen}
    </ChakraProvider>
  );
}

function ChoicesScreen(props: { rowData: any, buttonHandler: any }) {
  return (
    <ChoicesGrid rowData={props.rowData} buttonHandler={props.buttonHandler} />
  );
}

function AvatarSelectionScreen(props) {
  const _avatarComponents = [];
  const _selectComponents = [];
  for (let a = 0; a < config.avatars.length; a++) {
    _avatarComponents.push(
      <LinkBox key={a} as="article" maxW="sm" p="5" borderWidth="1px" rounded="md">
        <Heading size="md" my="2">
          {a + 1}
        </Heading>
        <Avatar
          size={64}
          name={config.avatars[a]}
          variant="beam"
          colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
        />
      </LinkBox>
    );
    _selectComponents.push(
        <option key={a} value={`avatar${a + 1}`}>Avatar {a + 1}</option>
    );
  }

  return (
    <Container>
      <Heading padding={4}>
        Select your avatar!
      </Heading>
      <Skeleton isLoaded>
        <SimpleGrid columns={config.avatars.length} gap={4} padding={4}>
          {_avatarComponents}
        </SimpleGrid>
        <Stack direction="row" spacing={4} padding={4}>
        <Select id={'avatarSelection'}>
          {_selectComponents}
        </Select>
        <Button
          rightIcon={<AiOutlineArrowRight />}
          colorScheme="teal"
          onClick={() => {
            props.avatarSelectionHandler()
          }}
        >
          Select
        </Button>
      </Stack>
      </Skeleton>
    </Container>
  );
}

function MatchScreen(props) {
  return (
    <Container>
      <Heading padding={4}>
        Matching you with another user...
      </Heading>
      <Spinner
        padding={4}
        thickness="4px"
        speed="1.25s"
        emptyColor="teal.200"
        color="teal.400"
        size="xl"
      />
    </Container>
  )
}

export function displayScreen(_type: string, _target: HTMLElement, _screenProps: any) {
  if (_type === 'choice') {
    render(
      ScreenLayout({
        screen: ChoicesScreen(_screenProps)
      }),
      _target
    );
  } else if (_type === 'avatarSelection') {
    render(
      ScreenLayout({
        screen: AvatarSelectionScreen(_screenProps)
      }),
      _target
    );
  } else if (_type === 'match') {
    render(
      ScreenLayout({
        screen: MatchScreen(_screenProps)
      }),
      _target
    );
  }
}