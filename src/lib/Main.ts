// Configuration and data
import {Configuration} from '../Configuration';

// Import the plugin before adding it to the timeline
import '../Plugin';

// Logging library
import consola from 'consola';

// Import and configure seedrandom
import seedrandom from 'seedrandom';
window.Math.random = seedrandom(Configuration.seed);

// Import custom types
import {Row, IndividualType} from './types/typing';

// Import data spreadsheets
import Competitive from '../data/competitive.csv';
import Individualist from '../data/individualist.csv';
import Prosocial from '../data/prosocial.csv';
import {Experiment} from './API';

window.onload = () => {
  // Timeline setup
  const timeline = [];
  const experiment = new Experiment();

  // Set the experiment to run in fullscreen mode
  if (Configuration.fullscreen === true) {
    timeline.push({
      type: 'fullscreen',
      message: `<p>Click 'Continue' to enter fullscreen mode.</p>`,
      fullscreen_mode: true,
    });
  }

  const instructionsPracticeGames = [
    `<h1>Intentions Game</h1>` +
    `<h2>Instructions</h2>` +
    `<p>The instructions for the task will go here. This can be ` +
      `multi-page, or just one page.</p>`,
  ];

  // Insert the instructions into the timeline
  timeline.push({
    type: 'instructions',
    pages: instructionsPracticeGames,
    allow_keys: false,
    show_page_number: true,
    show_clickable_nav: true,
  });

  // Insert a 'selection' screen into the timeline
  timeline.push({
    type: 'intentions-game',
    row: -1,
    display: 'selection',
  });

  // Insert a 'match' sequence into the timeline
  // timeline.push({
  //   type: 'intentions-game',
  //   row: -1,
  //   stage: 'matching',
  // });

  // timeline.push({
  //   type: 'intentions-game',
  //   row: -1,
  //   stage: 'matched',
  // });

  let dataCollection;

  // Insert the 'choice' screens into the timeline
  switch (Configuration.manipulations.individualType as IndividualType) {
    case 'Competitive': {
      dataCollection = Competitive;
      break;
    }
    case 'Individual': {
      dataCollection = Individualist;
      break;
    }
    case 'Prosocial': {
      dataCollection = Prosocial;
      break;
    }
    default:
      throw new Error(
          `Unknown individual type ` +
          `'${Configuration.manipulations.individualType}'`
      );
  }

  consola.info(
      `Loading '${Configuration.manipulations.individualType}' configuration`
  );

  // Collate and load rows into the timeline
  for (let i = 0; i < dataCollection.length; i++) {
    const row = dataCollection[i] as Row;
    timeline.push({
      type: 'intentions-game',
      optionOneParticipant: row.Option1_PPT,
      optionOnePartner: row.Option1_Partner,
      optionTwoParticipant: row.Option2_PPT,
      optionTwoPartner: row.Option2_Partner,
      typeOne: row.Type1,
      typeTwo: row.Type2,
      display: row.display,
    });
  }

  experiment.start(timeline);
};
