'use strict';

const CONFIG = require('../gulp.config');

const gulp = require('gulp');

const newer = require('gulp-newer');

module.exports = () => {
	return gulp.src(CONFIG.SRC.IMG, {since: gulp.lastRun('images')})
		.pipe(newer(CONFIG.DIST.IMG))
		.pipe(gulp.dest(CONFIG.DIST.IMG))
};