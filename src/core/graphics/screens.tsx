// UI components
import React from 'react';
import { render } from 'react-dom';
import { Grid, Box, Grommet, Heading, Card, Button, CardBody, CardFooter, Select, Spinner, WorldMap } from 'grommet';

// Import styling
import '../../css/styles.css';

// Additional components
import Avatar from 'boring-avatars';

// Configuration
import { config } from '../../config';

function ChoicesGrid(props) {
  return (
    <>
      <Grid
        rows={['xsmall','xxsmall', 'xsmall', 'xsmall']}
        columns={['medium', 'medium', 'medium']}
        gap="medium"
        areas={[
          { name: 'header', start: [0, 0], end: [1, 0] },
          { name: 'avatarArea', start: [2, 0], end: [2, 0] },
          { name: 'colOneHeader', start: [0, 1], end: [0, 1] },
          { name: 'colTwoHeader', start: [1, 1], end: [1, 1] },
          { name: 'colSelectHeader', start: [2, 1], end: [2, 1] },
          { name: 'colOneOptionOne', start: [0, 2], end: [0, 2] },
          { name: 'colTwoOptionOne', start: [1, 2], end: [1, 2] },
          { name: 'colSelectOptionOne', start: [2, 2], end: [2, 2] },
          { name: 'colOneOptionTwo', start: [0, 3], end: [0, 3] },
          { name: 'colTwoOptionTwo', start: [1, 3], end: [1, 3] },
          { name: 'colSelectOptionTwo', start: [2, 3], end: [2, 3] },
        ]}
      >
        {/* Avatar row */}
        <Box gridArea="header" background="white" />
        <Box
          gridArea="avatarArea"
          background="brand"
          round
          justify="center"
          align="center"
          direction="row-responsive"
        >
          <Box align="center" margin={{
            right: "small"
          }}>
            <h2>You</h2>
          </Box>
          <Box align="center" animation={["pulse"]}>
            {getAvatar(`${config.avatars[props.avatar - 1]}`, 50)}
          </Box>
        </Box>

        {/* Header row */}
        <Box
          gridArea="colOneHeader"
          background="white"
          justify="center"
          align="center"
          direction="row-responsive"
        >
          <h3>Points for You</h3>
        </Box>
        <Box
          gridArea="colTwoHeader"
          background="white"
          justify="center"
          align="center"
          direction="row-responsive"
        >
          <h3>Points for Your Partner</h3>
        </Box>
        <Box
          gridArea="colSelectHeader"
          background="white"
          justify="center"
          align="center"
          direction="row-responsive"
        >
          {/* <h3>Select</h3> */}
        </Box>

        {/* Option one row */}
        <Box
          gridArea="colOneOptionOne"
          background="light-5"
          round={{
            size: "small",
            corner: "left",
          }}
          justify="center"
          align="center"
          direction="row-responsive"
        >
          <h4>{props.rowData.Option1_PPT}</h4>
        </Box>
        <Box
          gridArea="colTwoOptionOne"
          background="light-5"
          justify="center"
          align="center"
          direction="row-responsive"
        >
          <h4>{props.rowData.Option1_Partner}</h4>
        </Box>
        <Box
          gridArea="colSelectOptionOne"
          background="light-5"
          round={{
            size: "small",
            corner: "right",
          }}
          justify="center"
          align="center"
          direction="row-responsive"
        >
          <Button
            primary
            label="Select Option 1"
            onClick={() => {
              props.buttonHandler("optionOne");
            }}
          />
        </Box>

        {/* Option two row */}
        <Box
          gridArea="colOneOptionTwo"
          background="light-2"
          round={{
            size: "small",
            corner: "left",
          }}
          justify="center"
          align="center"
          direction="row-responsive"
        >
          <h4>{props.rowData.Option2_PPT}</h4>
        </Box>
        <Box
          gridArea="colTwoOptionTwo"
          background="light-2"
          justify="center"
          align="center"
          direction="row-responsive"
        >
          <h4>{props.rowData.Option2_Partner}</h4>
        </Box>
        <Box
          gridArea="colSelectOptionTwo"
          background="light-2"
          round={{
            size: "small",
            corner: "right",
          }}
          justify="center"
          align="center"
          direction="row-responsive"
        >
          <Button
            primary
            label="Select Option 2"
            onClick={() => {
              props.buttonHandler("optionTwo");
            }}
          />
        </Box>
      </Grid>
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

function ChoicesScreen(props: { rowData: any, avatar: number, buttonHandler: any }) {
  return (
    <ChoicesGrid rowData={props.rowData} buttonHandler={props.buttonHandler} avatar={props.avatar} />
  );
}

function AvatarSelect(props: { columns: any; gridAreas: any; avatars: any; items: any; avatarSelectionHandler: any; }) {
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
            // Enable the 'Continue' button
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
          onClick={() => {
            props.avatarSelectionHandler(value);
          }}
        />
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
            {getAvatar(config.avatars[a])}
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

function getAvatar(_name: string, _size=120) {
  return (
    <Avatar
      size={_size}
      name={_name}
      variant="beam"
      colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
    />
  )
}

function MatchingScreen(props) {
  return (
    <Box align="center" animation={["fadeIn"]}>
      <h1>Matching you with another user...</h1>
      <Spinner size="large"/>
      <WorldMap
        color="brand"
        selectColor="accent-2"
      />
    </Box>
  )
}

function MatchedScreen(props) {
  return (
    <Box align="center" animation={["fadeIn"]}>
      <h1>Matched you with a partner!</h1>
      {getAvatar(config.partners[0], 240)}
    </Box>
  )
}

export function displayScreen(_type: string, _target: HTMLElement, _screenProps: any): void {
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
  } else if (_type === 'matching') {
    render(
      ScreenLayout({
        screen: MatchingScreen(_screenProps)
      }),
      _target
    );
  } else if (_type === 'matched') {
    render(
      ScreenLayout({
        screen: MatchedScreen(_screenProps)
      }),
      _target
    );
  }
}