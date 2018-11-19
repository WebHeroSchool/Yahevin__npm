"use strict";

var gulp = require('gulp');

var babel = require('gulp-babel');

gulp.task('buildJs', function () {
  return gulp.src(['*.js']).pipe(babel({
    presets: ['@babel/env']
  })).pipe(gulp.dest('build/js'));
});
gulp.task('buildCss', function () {
  return gulp.src(['*.css']).pipe(gulp.dest('build/css'));
});
gulp.task('build', ['buildCss', 'buildJs']);