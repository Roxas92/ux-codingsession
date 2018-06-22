var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');

var srcSass = 'scss/*scss',
    srcWatchSass = 'scss/**/*scss',
    destCSS = 'css'

// SASS task - compile sass to css
gulp.task('sass', function() {
  return gulp.src(srcSass)
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
      grid: true
    }))
    .pipe(gulp.dest(destCSS))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// browser-sync - reloads page after changing less
gulp.task('browser-sync', function() {
  browserSync({
    server: true,
    injectChanges: true
  });
});

// watch task - starts tasks on file change
gulp.task('watch', function() {
  gulp.watch([srcSass, srcWatchSass], ['sass']);
});

// browsersync watcher
// watch task - starts tasks on file change
gulp.task('browsersync-watch', ['browser-sync'], function() {
  gulp.watch([srcSass, srcWatchSass], ['sass']);
});

// default task - start all tasks
gulp.task('default', ['sass']);
