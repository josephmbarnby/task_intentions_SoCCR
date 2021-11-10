// React import
import React, {ReactElement} from 'react';

// Grommet UI components
import {
  Box, Button,
  Card, CardBody, CardFooter,
  Grid, Heading, Select,
} from 'grommet';

// Custom components
import {getStyledAvatar} from './StyledAvatar';

// Configuration
import {config} from '../../../config';

/**
 * Generic structure for the Avatar Selection Screen
 * @param {any} props collection of props
 * @return {any}
 */
export function SelectAvatar(props: {
  avatarSelectionHandler: (value: string) => void;
}): ReactElement {
  // Configure relevant states
  const [value, setValue] = React.useState('medium');
  const [isDisabled, setDisabled] = React.useState(true);

  const _avatarComponents = [];
  const _selectComponents = [];
  const _areas = [];
  const _items = [];
  const _columns = [];

  // Add an area for the title component
  _areas.push(
      {
        name: `title`,
        start: [0, 0],
        end: [config.avatars.length - 1, 0],
      }
  );

  // Populate the avatar components
  for (let a = 0; a < config.avatars.length; a++) {
    _avatarComponents.push(
        <Box gridArea={`avatar${a+1}`}>
          <Card height='small' width='auto' background='light-1'>
            <CardBody
              pad='small'
              alignSelf='center'
              animation={
                'pulse'
              }
            >
              {getStyledAvatar(config.avatars[a], 64)}
            </CardBody>
            <CardFooter pad={{horizontal: 'small'}} background='light-2'>
              <Heading level={4}>Avatar {a + 1}</Heading>
            </CardFooter>
          </Card>
        </Box>
    );

    // Add an option to the Select component
    _selectComponents.push(
        <option
          key={a}
          value={`avatar${a + 1}`}
        >
          <Heading level={4}>Avatar {a + 1}</Heading>
        </option>
    );

    // Add an area for the avatar component
    _areas.push(
        {
          name: `avatar${a + 1}`,
          start: [a, 1],
          end: [a, 1],
        }
    );

    // Add the avatar string to the list of items
    _items.push(
        `Avatar ${a + 1}`
    );

    _columns.push('xsmall');
  }

  // Area for the 'Continue' button
  _areas.push({
    name: 'continue',
    start: [config.avatars.length - 1, 2],
    end: [config.avatars.length - 1, 2],
  });

  // Area for the Select component
  _areas.push({
    name: 'select',
    start: [0, 2],
    end: [config.avatars.length - 2, 2],
  });

  return (
    <Grid
      rows={['auto', 'auto', 'auto']}
      columns={_columns}
      gap='small'
      areas={_areas}
      alignContent='center'
      justifyContent='center'
    >
      <Box gridArea='title'>
        <Heading>
          Select your avatar!
        </Heading>
      </Box>
      {_avatarComponents}
      <Box gridArea='select'>
        <Select
          options={_items}
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
