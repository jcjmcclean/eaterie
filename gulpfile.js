// Instantiate gulp plugins
const bs = require('browser-sync').create(),
	concat = require('gulp-concat'),
	del = require('del'),
	fileinclude = require('gulp-file-include'),
	gulp = require('gulp'),
	gulpIf = require('gulp-if'),
	postcss = require('gulp-postcss'),
	pump = require('pump'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	svgmin = require('gulp-svgmin'),
	svgstore = require('gulp-svgstore'),
	yargs = require('yargs');

// Get cmd line arguments
const argv = yargs.argv;
// Set devmode from arguments
const devMode = !!argv.development;

// Initialise browser sync
const browserSync = () => {
	bs.init({
		watchOptions: {
			ignoreInitial: true,
			ignored: ['node_modules/*', '.history', '.sass-cache', '.vscode', '.git']
		},

		files: ['./src'],
		server: {
			index: './dist/index.html'
		},
		port: 8080,
		ui: {
			port: 8081,
			weinre: {
				port: 8082
			}
		}
	});
};

// Compile SASS to CSS
const compileCss = cb => {
	return pump(
		[
			gulp.src('src/assets/sass/app.scss'),
			sourcemaps.init(),
			sass({ outputStyle: 'compressed' }),
			postcss([require('autoprefixer')(), require('cssnano')()]),
			gulpIf(devMode, sourcemaps.write('.')),
			gulp.dest('dist/assets/css'),
			gulpIf(devMode, bs.stream())
		],
		cb
	);
};

// Concatenate and minify JS
const compileJs = cb => {
	// Scripts to build
	const scripts = [
		'node_modules/gsap/dist/gsap.min.js',
		'node_modules/scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
		'node_modules/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
		'src/**/*.js'
	];

	return pump(
		[
			gulp.src(scripts),
			sourcemaps.init(),
			concat('app.min.js'),
			gulpIf(devMode, sourcemaps.write('.')),
			gulp.dest('dist/assets/js'),
			gulpIf(devMode, bs.stream())
		],
		cb
	);
};

// Create svg sprite
const createSprite = cb => {
	pump(
		[
			gulp.src('./src/assets/svg/*.svg'),
			svgmin({
				plugins: [
					{
						removeXMLNS: false
					},
					{
						removeStyleElement: false
					},
					{
						cleanupNumericValues: {
							floatPrecision: 2
						}
					}
				]
			}),
			svgstore(),
			rename('icons.svg'),
			gulp.dest('static/'),
			gulp.dest('dist/assets/'),
			bs.stream()
		],
		cb
	);
};

// Copy assets to dist
const copyAssets = cb => {
	pump([gulp.src('./static/**/*'), gulp.dest('dist/static/'), bs.stream()], cb);
};

// Copy markup to dist
const copyMarkup = cb => {
	pump(
		[
			gulp.src('./src/index.html'),
			fileinclude({
				prefix: '@@',
				basepath: '@file'
			}),
			gulp.dest('dist/'),
			bs.stream()
		],
		cb
	);
};

// Clean up dist files
const clean = cb => {
	// Delete the dist directory
	del('./dist');

	return cb();
};

// Define default gulp task
const defaultTask = cb => {
	// Build files for dist
	compileCss(cb);
	compileJs(cb);
	createSprite(cb);
	copyAssets(cb);
	copyMarkup(cb);

	if (devMode) {
		// Call browserSync task
		browserSync();

		// Define files to watch and tasks to run on change
		gulp.watch('src/**/*.scss', compileCss);
		gulp.watch('src/**/*.js', compileJs);
		gulp.watch(['src/**/*.html']).on('change', bs.reload);
		gulp.watch(['src/assets/svgs/*.svg']).on('change', createSprite);
	}

	return cb();
};

// Export gulp tasks
exports.default = defaultTask;
exports.clean = clean;
exports.createSprite = createSprite;
