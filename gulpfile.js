const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const path = {
	src: {
		script: 'scripts/*.js',
		style: 'styles/*.css'
	},
	buildFolder: {
		script: 'build/js',
		style: 'build/css'
	},
	buildName: {
		script: 'index.min.js',
		style: 'index.min.css'
	}
}

gulp.task('buildJs', () => {
	return gulp.src([path.src.script])
		.pipe(sourcemaps.init())
			.pipe(babel({
	            presets: ['@babel/env']}))
	        .pipe(concat(path.buildName.script))
	        .pipe(uglify())
	    .pipe(sourcemaps.write())
		.pipe(gulp.dest(path.buildFolder.script));
	});
gulp.task('buildCss', () => {
	return gulp.src([path.src.style])
		.pipe(sourcemaps.init())
			.pipe(concat(path.buildName.style))
			.pipe(cssnano())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.buildFolder.style));
	});
gulp.task('build', ['buildCss','buildJs']);

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(path.src.script, ['build', () => browserSync.reload ()]);
	gulp.watch(path.src.style, ['build', () => browserSync.reload ()]);
});

gulp.task('dev', ['build','browser-sync']);
gulp.task('prod', ['build']);
