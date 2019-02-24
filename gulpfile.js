var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');


var paths = {
  styles: {
    src: 'assets/dev/scss/**/*.scss',
    dest: 'assets/src/css/'
  },

  scripts: {
    src: 'assets/dev/js/**/*.js',
    dest: 'assets/src/js'
  }
};


function clean() {
  return del(['assets/src'])
}

function js_plugins() {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
  ])
  .pipe(concat("all.js"))
  .pipe(gulp.dest('assets/dev/js/plugins'));
}


function styles () {
  return gulp.src([paths.styles.src, './node_modules/bootstrap/scss/bootstrap.scss'])
      .pipe(sass())
      .pipe(cleanCSS())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest(paths.styles.dest))

      .pipe(browserSync.stream());
}


function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(gulp.dest(paths.scripts.dest))

    .pipe(browserSync.stream());
}


function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);

  gulp.watch('./*.html').on('change', browserSync.reload);
}


function sync() {
  browserSync.init({
        server: {
            baseDir: "./"
        }
  });
}



var build = gulp.series(clean, styles, scripts, gulp.parallel(watch, sync));


exports.clean = clean;
exports.js_plugins = js_plugins;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;

exports.default = build;
