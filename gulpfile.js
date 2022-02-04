const gulp = require('gulp');
const eslint = require('gulp-eslint');
const del = require('del');

/**
 * Run the linter
 * @param {Function} cb callback function
 */
function lint(cb) {
  gulp.src([
    'src/*.ts',
    'src/*.tsx',
    '!node_modules/**',
    '!dist/**'
  ])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  cb();
}

/**
 * Clean up build artefacts
 * @param {Function} cb callback function
 */
function clean(cb) {
  del([
    'dist',
  ]);
  cb();
}

exports.clean = clean;
exports.lint = lint;
exports.default = lint;
