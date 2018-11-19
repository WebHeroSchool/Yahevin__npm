const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('buildJs', () => {
	return gulp.src(['scripts/*.js'])
		.pipe(sourcemaps.init())
			.pipe(babel({
	            presets: ['@babel/env']
	        }))
	        .pipe(concat('all.js'))
	        .pipe(uglify())
	    .pipe(sourcemaps.write())
		.pipe(gulp.dest('build/js'));
	});
gulp.task('buildCss', () => {
	return gulp.src(['styles/*.css'])
		.pipe(sourcemaps.init())
			.pipe(concat('all.css'))
			.pipe(cssnano())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build/css'));
	});
gulp.task('build', ['buildCss','buildJs']);