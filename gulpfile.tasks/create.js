'use strict';

const CONFIG = require('../gulp.config');
const argv = require('yargs').argv;
const gulp = require('gulp');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const mergeStream = require('merge-stream');

module.exports = () => {
	console.log('argv: ', argv);

	let blockName = (argv.b) ? argv.b : 'demo-block';
	let blockPrefix = (argv.p) ? argv.p : 'b-';
	let path = '/block/common/' + blockPrefix + blockName;

	let streamSimple = gulp.src(CONFIG.SRC.PATH + '/block/blank/*.{css,less,sass,js,scss}')
			.pipe(replace('%block-name%', blockName))
			.pipe(replace('%prefix%', blockPrefix))
			.pipe(rename({
				basename: blockName,
				prefix: blockPrefix,
			}))
			.pipe(gulp.dest(CONFIG.SRC.PATH + path));

	let streamBlade = gulp.src(CONFIG.SRC.PATH + '/block/blank/*.php')
			.pipe(replace('%block-name%', blockName))
			.pipe(replace('%prefix%', blockPrefix))
			.pipe(rename({
				basename: blockName,
				prefix: blockPrefix,
				suffix: '.blade',
			}))
			.pipe(gulp.dest(CONFIG.SRC.PATH + path));
	console.log('[CONFIG.SRC.PATH + path]: ', CONFIG.SRC.PATH + path);
	return mergeStream(streamSimple, streamBlade)
};
