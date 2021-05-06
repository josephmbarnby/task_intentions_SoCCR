const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mustache = require('gulp-mustache');
const rename = require('gulp-rename');
const del = require('del');
const {argv} = require('yargs');

const DESTKOP = 'desktop';
const GORILLA = 'gorilla';

const platforms = [
  DESTKOP,
  GORILLA,
];

/**
 * Generate the configuration to be used with the templating engine
 * @param {string} platform desired build target platform
 * @return {object}
 */
function generateConfiguration(platform) {
  // Check that a known platform has been given
  if (!platforms.includes(platform)) {
    platform = DESTKOP;
  }

  return {
    libraries: [
      {src: 'jspsych/jspsych.js'},
      {src: 'jspsych/plugins/jspsych-instructions.js'},
      {src: 'plugin.js'},
    ],
    styles: [
      {src: 'css/styles.css'},
      {src: 'js/jspsych/css/jspsych.css'},
    ],
    classes: [
      {src: `${platform}.config.js`},
      {src: 'spreadsheet.data.js'},
      {src: 'timeline.js'},
      {src: 'lib.js'},
    ],
  };
}

/**
 * Install and configure the web apps locally for testing
 * @param {function} cb callback function
 */
function build(cb) {
  let target;
  if (argv.target === undefined) {
    target = DESTKOP;
  } else {
    target = argv.target;
  }

  // Copy all the items in the 'img' folder, copy jsPsych,
  // copy styling, add HTML and finally bundle all of it.
  gulp.src(`img/*`)
      .pipe(gulp.dest(`dist/img`));

  // Copy from node_modules
  gulp.src('node_modules/jspsych/**/*')
      .pipe(gulp.dest(`dist/js/jspsych`));

  // Copy Javascript files and install plugin.
  gulp.src(`src/*.js`)
      .pipe(gulp.dest(`dist/js`));

  // Styling
  gulp.src(`css/*.css`)
      .pipe(gulp.dest(`dist/css`));

  // Generate HTML file
  gulp.src('template.mustache')
      .pipe(mustache(generateConfiguration(target)))
      .pipe(rename('index.html'))
      .pipe(gulp.dest(`dist/`));
  cb();
}

/**
 * Run the style checker
 * @param {function} cb callback function
 */
function style(cb) {
  gulp.src(['src/*.js', '!node_modules/**'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  cb();
}

/**
 * Clean up build artefacts
 * @param {function} cb callback function
 */
function clean(cb) {
  del(['dist', 'docs']);
  cb();
}

exports.build = gulp.series(style, build);
exports.clean = clean;
exports.style = style;
exports.default = gulp.series(style, build);
