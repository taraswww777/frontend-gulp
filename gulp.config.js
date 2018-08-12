'use strict';

const argv = require('yargs').argv;
const path = require('path');

const PATH_SRC = './src';
const PATH_BASE_DIST = '/dist';

// в случае когда папка dist должна находиться в одной папке с  frontend-gulp
const PATH_WEB_ROOT = './tests';
// const PATH_WEB_ROOT = '.;

const PATH_DIST = PATH_WEB_ROOT + PATH_BASE_DIST;
const isWatch = argv.NODE_ENV === 'dev-watch';
const isDev = argv.NODE_ENV === 'dev' || isWatch;
const config = {
	gulp_tasks: './gulpfile.tasks/',
	isDev: isDev,
	isWatch: isWatch,
	WATCH:{
		SASS: PATH_SRC + '/**/*.{sass,scss}',
		ASSETS: PATH_SRC + '/assets/**',
		IMG: PATH_SRC + '/img/**',
		JS: PATH_SRC + '/**/*.js'
	},
	SRC: {
		PATH: PATH_SRC,
		SASS: PATH_SRC + '/entry/*.{sass,scss}',
		ASSETS: PATH_SRC + '/assets/**',
		IMG: PATH_SRC + '/img/**',
		JS: PATH_SRC + '/entry/*.js',
	},

	DIST: {
		PATH: PATH_DIST,
		SASS: PATH_DIST + '/css',
		ASSETS: PATH_DIST + '/assets',
		IMG: PATH_DIST + '/img',
		JS: PATH_DIST + '/js',
	},
	browserSync: {
		baseDir: PATH_WEB_ROOT,
		watch: PATH_WEB_ROOT + '/**'
	},
	MANIFEST: {
		PATH: path.join(__dirname, PATH_WEB_ROOT + PATH_BASE_DIST+'/manifest'),
		CSS: 'css.json',
		WEBPACK: 'js.json',
	},
	WEBPACK: {
		include: 'frontend-gulp'
	},
	autoprefixer: {
		browsers: ['last 4 versions'],
		cascade: false
	},
	cleanCSS: {debug: isDev, compatibility: 'ie8'}
};

module.exports = config;
