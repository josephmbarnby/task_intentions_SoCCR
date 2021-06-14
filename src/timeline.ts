import desktopConfig from "./desktop.config";
import * as spreadsheetData from "./spreadsheet.data";

// Configure jsPsych window variable
declare global {
  interface Window {
    jsPsych: any;
  }
}

// Timeline setup
const timeline = [];

const instructionsIntroduction = [
  `<h1>${desktopConfig.config.name}</h1>` +
  `<span class="instructions-subtitle">` +
    `Please read these instructions carefully</span>` +
  `<h2>Instructions</h2>` +
  `<p>You will now take part in a series of interactions ` +
    `with ONE partner. You will be matched with your ` +
    `partner in a moment.</p>` +
  `<p>You will play your partner for ${desktopConfig.config.trials.main} ` +
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

for (let i = 0; i < spreadsheetData.default.spreadsheet.rows.length; i++) {
  timeline.push({
    type: 'intentions-game',
    row: i,
  });
}

// -------------------- jsPsych --------------------
window.jsPsych.init({
  display_element: 'jspsych-target',
  timeline: timeline,
  on_finish: function() {
    if (desktopConfig.config.target === 'desktop') {
      window.jsPsych.data.get().localSave(`csv`, `intentions_${Date.now()}.csv`);
    }
  },
  show_progress_bar: true,
  show_preload_progress_bar: true,
  // preload_images: desktopConfig.config.images,
});
