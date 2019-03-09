var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var ts = require('gulp-typescript')


var paths = {
  styles: {
    src: 'assets/dev/scss/**/*.scss',
    dest: 'handbook/static/assets/css/'
  },

  scripts: {
    ts: 'assets/dev/ts/**/*.ts',

    src: 'assets/dev/js/app/*.js',
    dest: 'handbook/static/assets/js'
  }
};


function clean() {
  return del(['assets/src'])
}


function ts_(){
  return gulp.src(paths.scripts.ts)
      .pipe(ts({
        noImplicitAny: true,
        outFile: 'output.js',
      }))
      .pipe(gulp.dest('assets/dev/js/app'))
}
  


function js_plugins() {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
  ])
  .pipe(concat("all.js"))
  .pipe(gulp.dest('handbook/static/assets/js/plugins'));
}


function styles () {
  return gulp.src([paths.styles.src, './node_modules/bootstrap/scss/bootstrap.scss'])
      .pipe(sass())
      .pipe(cleanCSS())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest(paths.styles.dest))

}


function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(concat("main.js"))
    .pipe(gulp.dest(paths.scripts.dest))

}



function watch() {
  gulp.watch(paths.scripts.ts, ts_);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);

}


var build = gulp.series(clean, js_plugins, ts_, styles, scripts, gulp.parallel(watch));

exports.clean = clean;
exports.js_plugins = js_plugins;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
exports.ts_ = ts_;

exports.default = build;
