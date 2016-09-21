var gulp = require('gulp');
var jshint = require('gulp-jshint');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pump = require('pump');
var htmlmin = require('gulp-htmlmin')

gulp.task('jshint', function() {
  gulp.src('./src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('minify-css', function() {
  return gulp.src('css/src/SD-Map.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('css/dist/SD-Map.min.css'));
});

gulp.task('compress', function (cb) {
  pump([
        gulp.src('js/src/SD-Map.js'),
        uglify(),
        gulp.dest('js/dist/SD-Map.min.js')
    ],
    cb
  );
});

gulp.task('minify', function() {
  return gulp.src('neighborhood-map.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});
