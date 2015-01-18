var autoprefixer = require('gulp-autoprefixer'),
    gulp         = require('gulp'),
    minifycss    = require('gulp-minify-css'),
    sass         = require('gulp-sass');

var styles = {
  src: 'styles/**/*.scss',
  dest: 'build'
};


gulp.task('styles', function () {
  return gulp
    .src(styles.src)
    .pipe(sass({errLogToConsole: true}))
    .pipe(autoprefixer())
    .pipe(minifycss())
    .pipe(gulp.dest(styles.dest));
});


gulp.task('watch:styles', function () {
  gulp.watch(styles.src,  ['styles']);
});

gulp.task('default', function(){});
