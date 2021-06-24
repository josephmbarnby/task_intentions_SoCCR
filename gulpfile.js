const gulp = require('gulp');
const eslint = require('gulp-eslint');
const del = require('del');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

/**
 * Install and configure the web apps locally for testing
 * @param {function} cb callback function
 */
function build(cb) {
  // Copy all the items in the 'img' folder, copy jsPsych,
  // copy styling, add HTML and finally bundle all of it.
  gulp.src(`src/img/*`)
      .pipe(gulp.dest(`built/img`));

  browserify()
      .add(
          [
            'src/plugin.ts',
            'src/timeline.ts',
            'src/lib.ts',
            'src/config.js',
            'src/spreadsheet.data.js',
          ])
      .plugin('tsify', {noImplicitAny: false})
      .bundle()
      .pipe(source('task.js'))
      .pipe(gulp.dest(`built/js`));

  // Copy jsPsych files and install plugin.
  gulp.src(`node_modules/jspsych/**/*`)
      .pipe(gulp.dest(`built/js/jspsych`));

  // Styling
  gulp.src(`src/css/*.css`)
      .pipe(gulp.dest(`built/css`));

  // Copy HTML file
  gulp.src('src/index.html')
      .pipe(gulp.dest(`built/`));
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
  del(['built', 'docs']);
  cb();
}

exports.build = gulp.series(style, build);
exports.clean = clean;
exports.style = style;
exports.default = gulp.series(style, build);
