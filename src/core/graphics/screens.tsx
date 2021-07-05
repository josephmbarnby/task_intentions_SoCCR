import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(4),
      textAlign: 'center',
      color: theme.palette.text.primary,
      background: theme.palette.primary.light,
    },
    selectButton: {
      padding: theme.spacing(4),
      width: '100%',
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    }
  }),
);

function ChoicesGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4} alignItems='center' justify='center'>
        {/* Heading row */}
        <Grid item xs={4}>
          <h1>Points for you</h1>
        </Grid>
        <Grid item xs={4}>
          <h1>Points for your partner</h1>
        </Grid>
        <Grid item xs={4}>
          {/* <Paper className={classes.paper}>xs=4</Paper> */}
        </Grid>

        {/* First points row */}
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <h2>{props.rowData.Option1_PPT}</h2>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <h2>{props.rowData.Option1_Partner}</h2>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Button className={classes.selectButton} variant="contained">Option 1</Button>
        </Grid>

        {/* Second points row */}
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <h2>{props.rowData.Option2_PPT}</h2>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <h2>{props.rowData.Option2_Partner}</h2>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Button className={classes.selectButton} variant="contained">Option 2</Button>
        </Grid>
      </Grid>
    </div>
  );
}

export function ScreenLayout(props: { screen: any; }) {
  return (
    <Container>
      {props.screen}
    </Container>
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

    </Container>
  );
}