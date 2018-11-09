const gulp = require('gulp');
gulp.task('buildJs', () => {
	return gulp.src(['*.js'])
		.pipe(gulp.dest('build/js'));
	});
gulp.task('buildCss', () => {
	return gulp.src(['*.css'])
		.pipe(gulp.dest('build/css'));
	});
gulp.task('build', ['buildCss','buildJs']);