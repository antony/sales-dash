// Update: Hey Folks - I've got a full Gulpfile with everything else over at https://github.com/wesbos/React-For-Beginners-Starter-Files

var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var reactify = require('reactify');
var babelify = require('babelify');
var watchify = require('watchify');
var notify = require('gulp-notify');
var nodemon = require('gulp-nodemon');


function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {

  var props = {
    entries: ['./src/components/' + file],
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
    .pipe(gulp.dest('./public/'));
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}

gulp.task('run', function() {
  nodemon({ script : './app.js', ignore: ['./build', './src/assets', './public'], ext : 'js' });
});

gulp.task('scripts', function() {
  return buildScript('client.js', false);
});

gulp.task('default', ['scripts', 'run'], function() {
  return buildScript('client.js', true);
});
