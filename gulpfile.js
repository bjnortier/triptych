var gulp = require('gulp');
var path = require('path');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var mocha = require('gulp-mocha');

var srcFiles = path.join('lib', '**', '*.js');
var unitTestFiles = path.join('test', '**', '*.test.js');

// ----- Individual Tasks -----

gulp.task('clearconsole', function() {
  process.stdout.write('\x1Bc');
});

gulp.task('jshint', function() {
  return gulp.src([srcFiles, unitTestFiles])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('jscs', function() {
  return gulp.src([srcFiles, unitTestFiles])
    .pipe(jscs());
});

gulp.task('unit', function(){
    return gulp.src(unitTestFiles)
        .pipe(mocha({}));
});

// ----- Aggregate Tasks -----

gulp.task('test', ['jshint', 'jscs', 'unit']);

gulp.task('default', ['test']);

gulp.task('watch', function() {
  gulp.watch([srcFiles], ['clearconsole', 'test']);
  gulp.watch([unitTestFiles], ['clearconsole', 'test']);
});