var gulp = require('gulp');
var path = require('path');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var mocha = require('gulp-mocha');
var babel = require('gulp-babel');
var babel_register = require('babel/register');

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
 
gulp.task('babel', ['jshint', 'jscs'], function () {
  return gulp.src(srcFiles)
    // .pipe(sourcemaps.init())
    .pipe(babel())
    // .pipe(concat('flow.js'))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build'));
});

gulp.task('unit', ['babel'], function() {
  return gulp.src(unitTestFiles)
    .pipe(mocha({
      compilers: {
        js: babel_register
      }
    }));
});

// ----- Aggregate Tasks -----

gulp.task('test', ['jshint', 'jscs', 'babel', 'unit']);

gulp.task('default', ['test']);
gulp.task('build', ['babel']);

gulp.task('watch', function() {
  gulp.watch(srcFiles, ['clearconsole', 'jshint', 'jscs', 'unit']);
  gulp.watch(unitTestFiles, ['clearconsole', 'jshint', 'jscs', 'unit']);
  gulp.watch(functionalTestFiles, ['clearconsole', 'jshint', 'jscs']);
});