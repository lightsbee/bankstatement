'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var ejs = require("gulp-ejs");
var gutil = require('gulp-util'); // error log for ejs live-reload
var ejsmin = require('gulp-ejsmin'); // can remove comment and whitespace
var minifyejs = require('gulp-minify-ejs'); // can min html to one line
var rename = require("gulp-rename");
var jsmin = require('gulp-jsmin');
var imagemin = require('gulp-imagemin');

// GULP TASK
gulp.task('ejs', function() {
  return gulp.src('./src/views/*.ejs')
    .pipe(ejs({},{}, {ext:'.html'}).on('error', gutil.log))
    .pipe(ejsmin({removeComment: true}))
    .pipe(minifyejs())
    .pipe(gulp.dest("./dest"));
});

gulp.task('sass', function() {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dest/public/css'));
});

gulp.task('minJs', function() {
  return gulp.src('./src/js/*.js')
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dest/public/js'));
});

gulp.task('image', function() {
  gulp.src('./src/images/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({plugins: [{removeViewBox: true}]})
    ], {
      verbose: true
    }))
    .pipe(gulp.dest('./dest/public/images'));
});

// WATCH FILES WHICH CHANGED
gulp.task('sass:watch', function() {
  gulp.watch('./src/scss/*.scss', ['sass']);
});

gulp.task('minJs:watch', function() {
  gulp.watch('./src/js/*.js', ['minJs']);
});

gulp.task('ejs:watch', function() {
  gulp.watch('./src/views/**/**/*.ejs', ['ejs']);
});

//---------------------------------------------
gulp.task('default', ['sass:watch', 'ejs:watch', 'minJs:watch']);