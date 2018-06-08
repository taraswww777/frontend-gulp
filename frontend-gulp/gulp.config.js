'use strict';

const argv = require('yargs').argv;

const PATH_SRC = './src';

const PATH_DIST = '../www/dist';

const config = {
	gulp_tasks: './gulpfile.tasks/',
	isDev: argv.NODE_ENV === 'dev',
	SRC: {
		PATH: PATH_SRC,
		SASS: PATH_SRC + '/scss/*.{sass,scss}',
		ASSETS: PATH_SRC + '/assets/**',
		IMG: PATH_SRC + '/img/**',
	},

	DIST: {
		PATH: PATH_DIST,
		SASS: PATH_DIST + '/css',
		ASSETS: PATH_DIST + '/assets',
		IMG: PATH_DIST + '/img',
	},
	browserSync: {
		baseDir: '../www',
		watch: '../www/**'
	}
};

module.exports = config;