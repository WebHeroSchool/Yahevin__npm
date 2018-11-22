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
const postcssPresetEnv = require('postcss-preset-env');
const handlebars = require('gulp-compile-handlebars');
const postcssShort = require('postcss-short');
const autoprefixer = require('autoprefixer');
const nested = require('postcss-nested');
const assets = require('postcss-assets');
const rename = require("gulp-rename");
const glob = require("glob");

const context = require('./src/data.json');


const path = {
	src: {
		dir: 'src',
		script: 'src/scripts/*.js',
		style: 'src/styles/*.css'
	},
	buildFolder: {
		dir: 'build',
		script: 'build/js',
		style: 'build/css'
	},
	buildName: {
		script: 'index.min.js',
		style: 'index.min.css'
	},
	templates: 'src/templates/**/*.hbs'
}

env({
    file: 'env.json',
    type: 'ini'
});

gulp.task('compile', () => {
	glob(path.templates, function(err, files) {
		console.log(files)
		const options = {
			ignorePartials: true,
			batch: items = files.map( item => item.slice(0,item.lastIndexOf('/')))
		}
		gulp.src(`${path.src.dir}/index.hbs`)
		.pipe(handlebars(context, options))
		.pipe(rename('index.html'))
		.pipe(gulp.dest(path.buildFolder.dir));
	});	
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
	const plugins = [
		postcssPresetEnv,
		nested,
		assets({
    		loadPaths: ['images/']
    	}),
		postcssShort({ skip: '-' }),
		autoprefixer({
			browsers: ['last 2 version']
		}),
	];
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
