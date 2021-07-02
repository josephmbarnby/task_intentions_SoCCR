// Configuration and data
import {config} from './config';
import {spreadsheet} from './spreadsheet.data';

// Configure jsPsych window variable to make TypeScript happy
import 'jspsych/jspsych';
import * as $ from 'jquery';

// Import the plugin before adding it to the timeline
import './plugin';

// Import and configure seedrandom
import * as seedrandom from 'seedrandom';
window.Math.random = seedrandom(config.seed);

// Timeline setup
const timeline = [];

const instructionsIntroduction = [
  `<h1>${config.name}</h1>` +
  `<span class="instructions-subtitle">` +
    `Please read these instructions carefully</span>` +
  `<h2>Instructions</h2>` +
  `<p>You will now take part in a series of interactions ` +
    `with ONE partner. You will be matched with your ` +
    `partner in a moment.</p>` +
  `<p>You will play your partner for ${config.trials.main} ` +
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

timeline.push({
  type: 'instructions',
  pages: instructionsIntroduction,
  allow_keys: false,
  show_page_number: true,
  show_clickable_nav: true,
});

const instructionsPracticeGames = [
  `<h1>Intentions Game</h1>` +
  `<h2>Instructions</h2>` +
  `<p>The instructions for the task will go here. This can be ` +
    `multi-page, or just one page.</p>`,
];

timeline.push({
  type: 'instructions',
  pages: instructionsPracticeGames,
  allow_keys: false,
  show_page_number: true,
  show_clickable_nav: true,
});

timeline.push({
  type: 'intentions-game',
  row: -1,
  stage: 'match',
});

for (let i = 0; i < spreadsheet.rows.length; i++) {
  timeline.push({
    type: 'intentions-game',
    row: i,
    stage: 'choice',
  });
}

if (config.target === 'gorilla') {
  window.onload = (e) => {
    console.debug(`Loaded page @ ${performance.now()}`);
    const _gorilla = window['gorilla'];
    const _jsPsych = window['jsPsych'];
    require('jspsych/plugins/jspsych-instructions');
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
      });
    });
  };
} else {
  const _jsPsych = window['jsPsych'];
  require('jspsych/plugins/jspsych-instructions');
  _jsPsych.init({
    display_element: 'gorilla',
    timeline: timeline,
    on_finish: function() {
      _jsPsych.data.get().localSave(`csv`, `intentions_${Date.now()}.csv`);
    },
    show_progress_bar: true,
    show_preload_progress_bar: true,
    // preload_images: desktopConfig.config.images,
  });
}
