// UI components
import React from 'react';
import {render} from 'react-dom';
import {
  Grid, Box,
  Grommet, Heading, Card, Button,
  CardBody, CardFooter, Select, Spinner, Text, WorldMap,
} from 'grommet';

// Import styling
import '../../css/styles.css';

// Additional components
import Avatar from 'boring-avatars';

// Configuration
import {config} from '../../config';

/**
 * Generate the choices grid with options
 * @param {any} props collection of props
 * @return {any}
 */
function ChoicesGrid(props: {
    avatar: number; points: any;
    rowData: {
      Option1_PPT: number;
      Option1_Partner: number;
      Option2_PPT: number;
      Option2_Partner: number;
    };
    buttonHandler: (arg0: string) => void; }) {
  return (
    <>
      <Grid
        rows={['small', 'xsmall']}
        columns={['medium', 'medium', 'medium']}
        gap='medium'
        areas={[
          {name: 'avatarArea', start: [0, 0], end: [0, 0]},
          {name: 'placeholder', start: [1, 0], end: [1, 0]},
          {name: 'pointsArea', start: [2, 0], end: [2, 0]},
          {name: 'break', start: [0, 1], end: [2, 1]},
        ]}
      >
        {/* Avatar row */}
        <Box
          gridArea='avatarArea'
          background='brand'
          round
          justify='center'
          align='center'
          direction='row-responsive'
        >
          {/* Grid here */}
          <Grid
            rows={['xsmall', 'xsmall']}
            columns={['xsmall', 'xsmall']}
            gap='small'
            areas={[
              {name: 'youAvatarArea', start: [0, 0], end: [0, 0]},
              {name: 'youNameArea', start: [1, 0], end: [1, 0]},
              {name: 'youPointsArea', start: [0, 1], end: [1, 1]},
            ]}
          >
            <Box
              align='center'
              animation={['pulse']}
              gridArea='youAvatarArea'
              alignSelf='center'
            >
              {getAvatar(`${config.avatars[props.avatar - 1]}`, 50)}
            </Box>
            <Box align='center' gridArea='youNameArea' alignSelf='center'>
              <Heading>You</Heading>
            </Box>
            <Box align='center' gridArea='youPointsArea' alignSelf='center'>
              <Heading level={2}>&nbsp;{props.points}&nbsp;points</Heading>
            </Box>
          </Grid>
        </Box>
        <Box gridArea='placeholder' background='white' />
        <Box
          gridArea='pointsArea'
          background='neutral-1'
          round
          justify='center'
          align='center'
          direction='row-responsive'
        >
          <Box align='center' margin={{
            right: 'small',
          }}>
            <Heading level={2}>Points:</Heading>
          </Box>
          <Box align='center' animation={['pulse']}>
            <Heading level={2}>{props.points}</Heading>
          </Box>
        </Box>

        <Box gridArea='break' background='white' />

        {/* Header row */}
        {/* <Box
          gridArea='colOneHeader'
          background='white'
          justify='center'
          align='center'
          direction='row-responsive'
        >
          <Heading level={2}>Points for You</Heading>
        </Box>
        <Box
          gridArea='colTwoHeader'
          background='white'
          justify='center'
          align='center'
          direction='row-responsive'
        >
          <Heading level={2}>Points for Your Partner</Heading>
        </Box>
        <Box
          gridArea='colSelectHeader'
          background='white'
          justify='center'
          align='center'
          direction='row-responsive'
        >
          <h3>Select</h3>
        </Box> */}

        {/* Option two row */}
        {/* <Box
          gridArea='colOneOptionTwo'
          background='light-2'
          round={{
            size: 'small',
            corner: 'left',
          }}
          justify='center'
          align='center'
          direction='row-responsive'
        >
          <Heading level={3}>{props.rowData.Option2_PPT}</Heading>
        </Box>
        <Box
          gridArea='colTwoOptionTwo'
          background='light-2'
          justify='center'
          align='center'
          direction='row-responsive'
        >
          <Heading level={3}>{props.rowData.Option2_Partner}</Heading>
        </Box>
        <Box
          gridArea='colSelectOptionTwo'
          background='light-2'
          round={{
            size: 'small',
            corner: 'right',
          }}
          justify='center'
          align='center'
          direction='row-responsive'
        >
          <Button
            primary
            label='Select Option 2'
            onClick={() => {
              props.buttonHandler('optionTwo');
            }}
          />
        </Box> */}
      </Grid>
      {/* Option one row */}
      <Option
        pointsPPT={props.rowData.Option1_PPT}
        pointsParter={props.rowData.Option1_Partner}
      />
    </>
  );
}

/**
 * Generate an Option grid
 * @param {any} props collection of props
 * @return {any}
 */
function Option(props: { pointsPPT: number, pointsParter: number}): any {
  return (
    <Grid
      rows={['xsmall']}
      columns={['med', 'med']}
      fill={true}
      gap='small'
      areas={[
        {name: 'pointsYou', start: [0, 0], end: [0, 0]},
        {name: 'pointsPartner', start: [1, 0], end: [1, 0]},
      ]}
      className={'grow'}
    >
      <Box
        gridArea='pointsYou'
        background='light-5'
        round={{
          size: 'small',
          corner: 'left',
        }}
        justify='center'
        align='center'
        direction='row-responsive'
      >
        <Heading level={3}>{props.pointsPPT}</Heading>
      </Box>
      <Box
        gridArea='pointsPartner'
        background='light-5'
        justify='center'
        align='center'
        direction='row-responsive'
      >
        <Heading level={3}>{props.pointsParter}</Heading>
      </Box>
    </Grid>
  );
}

/**
 * Generic container for all Grommet components
 * @param {any} props collection of props
 * @return {any}
 */
function ScreenLayout(props: { screen: any; }) {
  return (
    <Grommet>
      {props.screen}
    </Grommet>
  );
}

/**
 * Generic structure for the Choices Screen
 * @param {any} props collection of props
 * @return {any}
 */
function ChoicesScreen(props: {
  rowData: any, avatar: number, points: number, buttonHandler: any
}) {
  return (
    <ChoicesGrid
      rowData={props.rowData}
      buttonHandler={props.buttonHandler}
      avatar={props.avatar}
      points={props.points}
    />
  );
}

/**
 * Generic structure for the Avatar Selection Screen
 * @param {any} props collection of props
 * @return {any}
 */
function AvatarSelect(props: {
  columns: any;
  gridAreas: any;
  avatars: any;
  items: any;
  avatarSelectionHandler: any;
}) {
  // Configure relevant states
  const [value, setValue] = React.useState('medium');
  const [isDisabled, setDisabled] = React.useState(true);

  return (
    <Grid
      rows={['small', 'auto']}
      columns={props.columns}
      gap='small'
      areas={props.gridAreas}
      alignContent='center'
      justifyContent='center'
    >
      {props.avatars}
      <Box gridArea='select'>
        <Select
          options={props.items}
          value={value}
          onChange={({option}) => {
            setValue(option);
            // Enable the 'Continue' button
            setDisabled(false);
          }}
          placeholder='Select an Avatar...'
        />
      </Box>
      <Box
        gridArea='continue'
        alignContent='center'
        justify='center'
        alignSelf='center'
      >
        <Button
          primary
          label='Continue'
          disabled={isDisabled}
          onClick={() => {
            props.avatarSelectionHandler(value);
          }}
        />
      </Box>
    </Grid>
  );
}

/**
 * Generic container and layout for the Avatar Selection Screen
 * @param {any} props collection of props
 * @return {any}
 */
function AvatarSelectionScreen(props) {
  const _avatarComponents = [];
  const _selectComponents = [];
  const _areas = [];
  const _items = [];
  const _columns = [];
  for (let a = 0; a < config.avatars.length; a++) {
    _avatarComponents.push(
        <Box gridArea={`avatar${a+1}`}>
          <Card height='small' width='small' background='light-1'>
            <CardBody
              pad='medium'
              alignContent='center'
              alignSelf='center'
              animation={
                'pulse'
              }
            >
              {getAvatar(config.avatars[a])}
            </CardBody>
            <CardFooter pad={{horizontal: 'small'}} background='light-2'>
              <Heading level={4}>Avatar {a + 1}</Heading>
            </CardFooter>
          </Card>
        </Box>
    );

    _selectComponents.push(
        <option
          key={a}
          value={`avatar${a + 1}`}
        >
          <Text level={4}>Avatar {a + 1}</Text>
        </option>
    );

    _areas.push(
        {
          name: `avatar${a + 1}`,
          start: [a, 0],
          end: [a, 0],
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
    end: [config.avatars.length - 1, 1],
  });

  _areas.push({
    name: 'select',
    start: [0, 1],
    end: [config.avatars.length - 2, 1],
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

/**
 * Generate an avatar from a name
 * @param {string} _name name used to generate the avatar
 * @param {number} _size dimensions of the avatar
 * @return {any}
 */
function getAvatar(_name: string, _size=120) {
  return (
    <Avatar
      size={_size}
      name={_name}
      variant='beam'
      colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
    />
  );
}

/**
 * Generate layout of Matching Screen
 * @param {any} props collection of props
 * @return {any}
 */
function MatchingScreen(props) {
  return (
    <Box align='center' animation={['fadeIn']}>
      <Heading>Matching you with another user...</Heading>
      <Spinner size='large'/>
      <WorldMap
        color='brand'
        selectColor='accent-2'
      />
    </Box>
  );
}

/**
 * Generate layout of Matched Screen
 * @param {any} props collection of props
 * @return {any}
 */
function MatchedScreen(props) {
  return (
    <Box align='center' animation={['fadeIn']}>
      <Heading>Matched you with a partner!</Heading>
      {getAvatar(config.partners[0], 240)}
    </Box>
  );
}

/**
 * Switch between different screens
 * @param {string} _type screen type
 * @param {HTMLElement} _target target DOM element
 * @param {any} _screenProps collection of props
 */
export function displayScreen(
    _type: string, _target: HTMLElement, _screenProps: any
): void {
  if (_type === 'choice') {
    render(
        ScreenLayout({
          screen: ChoicesScreen(_screenProps),
        }),
        _target
    );
  } else if (_type === 'avatarSelection') {
    render(
        ScreenLayout({
          screen: AvatarSelectionScreen(_screenProps),
        }),
        _target
    );
  } else if (_type === 'matching') {
    render(
        ScreenLayout({
          screen: MatchingScreen(_screenProps),
        }),
        _target
    );
  } else if (_type === 'matched') {
    render(
        ScreenLayout({
          screen: MatchedScreen(_screenProps),
        }),
        _target
    );
  }
}
