const gulp = require('gulp');
const env = require('gulp-env');
const gulpif = require('gulp-if');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
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

env({
    file: 'env.json',
    type: 'ini'
});

gulp.task('buildJs', () => {
	return gulp.src([path.src.script])
		.pipe(sourcemaps.init())
			.pipe(babel({
	            presets: ['@babel/env']}))
	        .pipe(concat(path.buildName.script))
	        .pipe(gulpif(process.env.NODE_ENV === 'production',uglify()))
	    .pipe(sourcemaps.write())
		.pipe(gulp.dest(path.buildFolder.script))
	});
gulp.task('buildCss', () => {
	const plugins = [];
	return gulp.src([path.src.style])
		.pipe(sourcemaps.init())
			.pipe(concat(path.buildName.style))
			.pipe(gulpif(process.env.NODE_ENV === 'production',cssnano()))
		.pipe(sourcemaps.write())
		.pipe(postcss(plugins))
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

gulp.task('clean', function () {
    return gulp.src('build/*', {read: false})
        .pipe(clean())
});

gulp.task('dev', ['build','browser-sync']);
gulp.task('prod', ['build']);
