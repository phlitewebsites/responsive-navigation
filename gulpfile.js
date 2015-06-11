var autoprefixer = require('gulp-autoprefixer')
var browserify = require('browserify')
var collapse = require('bundle-collapser/plugin')
var plumber = require('gulp-plumber')
var glob = require('glob')
var gulp = require('gulp')
var gutil = require('gulp-util')
var path = require('path')
var sass = require('gulp-sass')
var source = require('vinyl-source-stream')

var onError = function (err) {
  gutil.beep()
  console.log(err.toString())
  this.emit('end')
}

/**
 * Scripts
 */

var scripts = {
  src: 'lib/**/*.js',
  dest: 'build'
}

gulp.task('bundle-scripts', function () {
  var files = glob.sync('./lib/*.js')

  files.forEach(function (file) {
    browserify(file)
      .plugin(collapse)
      .bundle()
      .on('error', onError)
      .pipe(source(path.basename(file)))
      .pipe(gulp.dest(scripts.dest))
  })
})

/**
 * Styles
 */

var styles = {
  src: 'styles/**/*.scss',
  dest: 'build'
}

gulp.task('styles', function () {
  return gulp
    .src(styles.src)
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest(styles.dest))
})

/**
 * Default
 */

gulp.task('default', [ 'styles', 'bundle-scripts' ], function () {
  gulp.watch(styles.src, ['styles'])
  gulp.watch(scripts.src, ['bundle-scripts'])
})
