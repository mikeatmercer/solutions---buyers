//DEV
var gulp = require('gulp');

var sass = require('gulp-sass');
var replace = require('gulp-replace');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

gulp.task("move", function(){
return gulp.src(['production.html ', 'assets/**/*'])
        .pipe(gulp.dest('Y:/SolutionsBuyers'))
});
gulp.task('scripts',function(){
  return gulp.src(['scripts/**/*.js','scripts.js'])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('Y:/SolutionsBuyers'));
});
gulp.task('sass',function(){
  return gulp.src('scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('Y:/SolutionsBuyers'));
});
gulp.task('js-prod',function(){
  return gulp.src(['scripts/**/*.js','scripts.js'])
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('../solutions_buyers_prod'));
});
gulp.task('css-prod',function(){
  return gulp.src('scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('../solutions_buyers_prod'));
});
gulp.task('move-prod',function(){
  return gulp.src(['production.html ', 'assets/**/*'])
    .pipe(replace('var date = new Date().getTime();', 'var date = 1.2;'))
    .pipe(gulp.dest('../solutions_buyers_prod'))
});

gulp.task('prod',['js-prod','css-prod','move-prod']);

gulp.task('watch', function() {
    gulp.watch(['production.html ', 'assets/**/*'], ['move']);
    gulp.watch(['scripts/**/*.js','scripts.js'], ['scripts']);
    gulp.watch(['scss/**/*'], ['sass']);
});
