const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('buildJs', () => {
	return gulp.src(['*.js'])
		.pipe(babel({
            presets: ['@babel/env']
        }))
		.pipe(gulp.dest('build/js'));
	});
gulp.task('buildCss', () => {
	return gulp.src(['*.css'])
		.pipe(gulp.dest('build/css'));
	});
gulp.task('build', ['buildCss','buildJs']);