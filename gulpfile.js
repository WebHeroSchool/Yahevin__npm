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
const Handlebars = require('gulp-compile-handlebars');
const gulpStylelint = require('gulp-stylelint');
const postcssShort = require('postcss-short');
const reporter = require('postcss-reporter');
const autoprefixer = require('autoprefixer');
const nested = require('postcss-nested');
const assets = require('postcss-assets');
const stylelint = require('stylelint');
const rename = require("gulp-rename");
const eslint = require('gulp-eslint');
const glob = require("glob");





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
	templates: 'src/templates/**/*.hbs',
	lint: {
		scripts: ['src/**/*.js','!node_modules/**','build/**'],
		styles : ['src/**/*.css','!node_modules/**','build/**'],
	},
	contextJson: 'src/data.json',
	fonts: 'src/fonts',
	assets: 'src/assets'
}
const context = require('./src/data.json');
const styleRules = require('./src/StyleRules.json');
const ESRule = require('./src/ESRules.json');

env({
    file: 'src/env.json',
    type: 'ini'
});

gulp.task('eslint', () => {
	gulp.src(path.lint.scripts)
	.pipe(eslint(ESRule))
	.pipe(eslint.format())
});

gulp.task('styleLint', () => {
  	gulp.src(path.lint.styles)
    .pipe(postcss([
    	stylelint(styleRules),
    	reporter({
    		clearMessages: true,
    		throwError: false
    	})
    ]))
});

gulp.task('lint', ['styleLint','eslint']);

gulp.task('compile', () => {
	glob(path.templates, function(err, files) {
		const options = {
			ignorePartials: true,
			batch: items = files.map( item => item.slice(0,item.lastIndexOf('/'))),
			helpers: {
				with: (context,options) => options.fn(context),
				bold: (options) => '<div class="mybold">'+ options.fn(this)+'</div>'		
			}			
		}		
		gulp.src(`${path.src.dir}/index.hbs`)
		.pipe(Handlebars(context, options))
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

gulp.task('fonts', () => {
    gulp.src(path.fonts)
        .pipe(filter(['*.woff', '*.woff2']))
        .pipe(gulp.dest(`${paths.buildFolder}/fonts`));
});

gulp.task('assets', () => {
    glob(paths.assets, (err, files) => {
        if (!err) {
            gulp.src(files)
                .pipe(gulp.dest(`${paths.buildFolder}/assets`));
        } else {
            throw err;
        }
    });
});

gulp.task('build', ['buildCss','buildJs','assets','fonts']);

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(path.src.script, ['buildJs']);
	gulp.watch(path.src.style, ['buildCss']);
	gulp.watch(path.src.dir, ['compile']);
	gulp.watch(path.contextJson)
		.on('change',browserSync.reload);
	gulp.watch(`${path.buildFolder}/**/*`)
		.on('change',browserSync.reload);

});

gulp.task('dev', ['build','browser-sync']);
gulp.task('prod', ['build']);

gulp.task('clean', function () {
    return gulp.src('build/*', {read: false})
        .pipe(clean())
});
