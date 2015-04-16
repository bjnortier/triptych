var gulp = require('gulp');
var path = require('path');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var mocha = require('gulp-mocha');
var webpack = require('webpack');

var srcFiles = path.join('lib', '**', '*.js');
var unitTestFiles = path.join('test', 'unit', '**', '*.test.js');
var functionalTestFiles = path.join('test', 'functional', 'src', '*.js');

// ----- Individual Tasks -----

gulp.task('clearconsole', function() {
  process.stdout.write('\x1Bc');
});

gulp.task('jshint', function() {
  return gulp.src([srcFiles, unitTestFiles, functionalTestFiles])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('jscs', function() {
  return gulp.src([srcFiles, unitTestFiles])
    .pipe(jscs());
});

gulp.task('unit', function() {
  return gulp.src(unitTestFiles)
    .pipe(mocha({}));
});

gulp.task('webpack', function(callback) {
  webpack({
    entry: {
      'events.test': './test/functional/src/events.test.js',
    },
    output: {
      path: 'test/functional/lib',
      filename: '[name].bundle.js',
      publicPath: 'lib/',
    },
    devtool: '#inline-source-map',
  }, function(err, stats) {
    if (err || (stats.hasErrors)) {
      var errorMsg = err || stats.compilation.errors.join('\n');
      callback(errorMsg);
    } else {
      callback();
    }
  });
});

// ----- Aggregate Tasks -----

gulp.task('test', ['jshint', 'jscs', 'unit', 'webpack']);

gulp.task('default', ['test']);

gulp.task('watch', function() {
  gulp.watch(srcFiles, ['clearconsole', 'jshint', 'jscs', 'unit', 'webpack']);
  gulp.watch(unitTestFiles, ['clearconsole', 'jshint', 'jscs', 'unit']);
  gulp.watch(functionalTestFiles, ['clearconsole', 'jshint', 'jscs', 'webpack']);
});