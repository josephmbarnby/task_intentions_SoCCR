// Timeline setup
const timeline = [];

const practiceGames = [
  `<h1>Intentions Game</h1>` +
  `<p>Test</p>`,
];

timeline.push({
  type: 'instructions',
  pages: practiceGames,
  allow_keys: false,
  show_page_number: true,
  show_clickable_nav: true,
});

timeline.push({
  type: 'intentions-game',
});

// -------------------- jsPsych --------------------
jsPsych.init({
  display_element: 'jspsych-target',
  timeline: timeline,
  on_finish: function() {
    jsPsych.data.displayData('csv');
  },
  show_progress_bar: true,
  show_preload_progress_bar: true,
  // preload_images: config.images,
});
