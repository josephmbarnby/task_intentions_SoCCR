// Configuration and data
import {Configuration} from './Configuration';
import {ManipulationAPI} from './lib/api/Manipulations';
import {STAGES} from './lib/Parameters';

// Configure jsPsych window variable to make TypeScript happy
import 'jspsych/jspsych';
import 'jspsych/plugins/jspsych-instructions';

// jQuery for Gorilla
import $ from 'jquery';

// Import the plugin before adding it to the timeline
import './lib/Plugin';

// Logging library
import consola from 'consola';

// Import and configure seedrandom
import seedrandom from 'seedrandom';
window.Math.random = seedrandom(Configuration.seed);

// Import data spreadsheets
import Competitive from './data/competitive.csv';
import Individualist from './data/individualist.csv';
import Prosocial from './data/prosocial.csv';
import {Row, IndividualType} from './types/data';

// Timeline setup
const timeline = [];

window.onload = () => {
  if (Configuration.target === 'gorilla') {
    // Configure the manipulations in the configuration file as required
    new ManipulationAPI(
        Configuration.trials,
        ['phaseOne', 'phaseTwo', 'phaseThree']
    );
  }

  // Calculate the number of trials in total
  let totalTrials = 0;
  for (const _field of Object.keys(Configuration.trials)) {
    totalTrials += parseInt(Configuration.trials[`${_field}`]);
  }

  const instructionsIntroduction = [
    `<h1>${Configuration.name}</h1>` +
    `<span class="instructions-subtitle">` +
      `Please read these instructions carefully</span>` +
    `<h2>Instructions</h2>` +
    `<p>You will now take part in a series of interactions ` +
      `with ONE partner. You will be matched with your ` +
      `partner in a moment.</p>` +
    `<p>You will play your partner for ${totalTrials} ` +
      `trials. </p>` +
    `<p>Their ID and your ID has been hidden to preserve ` +
      `anonymity.</p>` +
    `<p><span class="instructions-emphasis">In each trial ` +
      `you will choose between two options that determine ` +
      `how many points you and your partner will receive in ` +
      `that trial.</span></p>` +
    `<p>The total number of points you earn in this task will ` +
      `be the the sum of the points you earn in each trial.</p>`,
  ];

  // timeline.push({
  //   type: 'instructions',
  //   pages: instructionsIntroduction,
  //   allow_keys: false,
  //   show_page_number: true,
  //   show_clickable_nav: true,
  // });

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
  switch (Configuration.individualType as IndividualType) {
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
          `Unknown individual type '${Configuration.individualType}'`
      );
  }

  consola.info(`Loading '${Configuration.individualType}' configuration`);

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

  // Initialise jsPsych and Gorilla (if required)
  if (Configuration.target === 'gorilla') {
    // Once all modules are loaded into the window,
    // access Gorilla API and jsPsych library
    const _gorilla = window['gorilla'];
    const _jsPsych = window['jsPsych'];

    // Require any jsPsych plugins, so that they are
    // loaded here
    _gorilla.ready(function() {
      _jsPsych.init({
        display_element: $('#gorilla')[0],
        timeline: timeline,
        on_data_update: function(data) {
          _gorilla.metric(data);
        },
        on_finish: function() {
          _gorilla.finish();
        },
        show_progress_bar: true,
        show_preload_progress_bar: true,
      });
    });
  } else {
    // Once all modules are loaded into the window,
    // access jsPsych library
    const _jsPsych = window['jsPsych'];

    // Require any jsPsych plugins, so that they are
    // loaded here
    _jsPsych.init({
      timeline: timeline,
      on_finish: function() {
        _jsPsych.data.get().localSave(
            `csv`,
            `intentions_complete_${Date.now()}.csv`
        );
      },
      show_progress_bar: true,
      show_preload_progress_bar: true,
    });
  }
};
