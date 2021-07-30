// UI components
import React from 'react';
import { render } from 'react-dom';
import { Grid, Box, Grommet, Heading, Card, Button, CardHeader, CardBody, CardFooter, DropButton, Menu, Select } from 'grommet';
import { Favorite, ShareOption } from 'grommet-icons';
import { AiOutlineArrowRight } from 'react-icons/ai';

// Import styling
import '../../css/styles.css';

// Additional components
import Avatar from 'boring-avatars';

// Configuration
import { config } from '../../config';
import { spreadsheet } from '../../data';

function ChoicesGrid(props) {
  return (
    <>
      {/* <Row className="m-2 g-2">
        <Col xs="auto">
          Points for you
        </Col>
        <Col xs="auto">
          Points for your partner
        </Col>
        <Col>
        </Col>
      </Row>

      <Row className="m-2 g-2">
        <Col xs="auto">
          <Card
            style={{
              color: 'black',
            }}
          >
            <Card.Body>{props.rowData.Option1_PPT}</Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            style={{
              color: 'black',
            }}
          >
            <Card.Body>{props.rowData.Option1_Partner}</Card.Body>
          </Card>
        </Col>
        <Col>
          <Button
            size="lg"
            variant="teal"
            onClick={() => {
              props.buttonHandler('optionOne');
            }}
          >
            Option 1
          </Button>
        </Col>
      </Row> */}

      {/* <Row className="m-2 g-2">
        <Col>
          {props.rowData.Option2_PPT}
        </Col>
        <Col>
          {props.rowData.Option2_Partner}
        </Col>
        <Col>
          <Button
            size="lg"
            variant="teal"
            onClick={() => {
              props.buttonHandler('optionTwo');
            }}
          >
            Option 1
          </Button>
        </Col>
      </Row>
      <div class="w-100"></div> */}
    </>
  );
}

function ScreenLayout(props: { screen: any; }) {
  return (
    <Grommet>
      {props.screen}
    </Grommet>
  );
}

function ChoicesScreen(props: { rowData: any, buttonHandler: any }) {
  return (
    <ChoicesGrid rowData={props.rowData} buttonHandler={props.buttonHandler} />
  );
}

function AvatarSelect(props) {
  // Configure relevant states
  const [value, setValue] = React.useState('medium');
  const [isDisabled, setDisabled] = React.useState(true);

  return (
    <Grid
        rows={['small', 'auto']}
        columns={props.columns}
        gap="small"
        areas={props.gridAreas}
        alignContent="center"
        justifyContent="center"
    >
      {props.avatars}
      <Box gridArea="select">
      <Select
          options={props.items}
          value={value}
          onChange={({ option }) => {
            setValue(option);
            setDisabled(false);
          }}
          placeholder="Select an Avatar..."
        />
      </Box>
      <Box
        gridArea="continue"
        alignContent="center"
        justify="center"
        alignSelf="center"
      >
        <Button
          primary
          label="Continue"
          disabled={isDisabled}
          onClick={props.avatarSelectionHandler}
        ></Button>
      </Box>
    </Grid>
  );
}

function AvatarSelectionScreen(props) {
  const _avatarComponents = [];
  const _selectComponents = [];
  const _areas = [];
  const _items = [];
  const _columns = [];
  for (let a = 0; a < config.avatars.length; a++) {
    _avatarComponents.push(
      <Box gridArea={`avatar${a+1}`}>
        <Card height="small" width="small" background="light-1">
          <CardBody
            pad="medium"
            alignContent="center"
            alignSelf="center"
            animation={
              "pulse"
            }
          >
            <Avatar
              size={120}
              name={config.avatars[a]}
              variant="beam"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
          </CardBody>
          <CardFooter pad={{horizontal: "small"}} background="light-2" alignContent="center">   
            Avatar {a + 1}
          </CardFooter>
        </Card>
      </Box>
    );
  
    _selectComponents.push(
        <option key={a} value={`avatar${a + 1}`}>Avatar {a + 1}</option>
    );

    _areas.push(
      {
        name: `avatar${a + 1}`,
        start: [a, 0],
        end: [a, 0]
      }
    );

    _items.push(
      `Avatar ${a + 1}`
    );

    _columns.push('small');
  }

  _areas.push({
    name: 'continue',
    start: [config.avatars.length - 1, 1],
    end: [config.avatars.length - 1, 1]
  });

  _areas.push({
    name: 'select',
    start: [0, 1],
    end: [config.avatars.length - 2, 1]
  });

  return (
    <Box>
      <Heading>
        Select your avatar!
      </Heading>
      <AvatarSelect 
        columns={_columns}
        gridAreas={_areas}
        avatars={_avatarComponents}
        items={_items}
        avatarSelectionHandler={props.avatarSelectionHandler}
      />
    </Box>
  );
}

function MatchScreen(props) {
  return (
    <Box>
      <h1>
        Matching you with another user...
      </h1>
      {/* <Spinner animation="border" role="status"></Spinner> */}
    </Box>
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