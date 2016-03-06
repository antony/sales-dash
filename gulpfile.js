'use strict';

const source = require('vinyl-source-stream');
const gulp = require('gulp');
const gutil = require('gulp-util');
const browserify = require('browserify');
const reactify = require('reactify');
const babelify = require('babelify');
const watchify = require('watchify');
const notify = require('gulp-notify');
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

let staticFiles = {
  js: ['./node_modules/jquery/dist/jquery.js']
};

function buildScript(file, watch) {

  var props = {
    entries: [`./src/components/${file}`],
    extensions: ['.jsx'],
    debug : true
  };

  var bundler = browserify(props)
                .transform(babelify, {presets: ["es2015", "react"]})
                .transform(reactify);

  if (watch) {
    bundler = watchify(bundler);
  }

  function rebundle() {
    var stream = bundler.bundle();
    return stream
    .on('error', handleErrors)
    .pipe(source(file))
    .pipe(notify("Finished Rebuild"))
    .pipe(gulp.dest('./public/'));
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
  });

  // run it once the first time buildScript is called
  return rebundle();
}

gulp.task('sass', function () {
  return gulp.src('./src/assets/sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/assets/sass/**/*.scss', ['sass']);
});

gulp.task('thirdparty:js', function() {
  return gulp.src(staticFiles.js)
  .pipe(concat('thirdparty.js'))
  .pipe(gulp.dest('./public/thirdparty'));
});

gulp.task('run', function() {
  nodemon({ script : './app.js', ignore: ['build/*', 'src/assets/*', 'public/*'], ext : 'js' });
});

gulp.task('scripts', ['sass:watch'], function() {
  return buildScript('client.js', false);
});

gulp.task('default', ['scripts', 'thirdparty:js', 'run'], function() {
  return buildScript('client.js', true);
});
