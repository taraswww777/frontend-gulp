'use strict';

const CONFIG = require('../gulp.config');

const gulp = require('gulp');
const _ = require('gulp-load-plugins')();


module.exports = () => {
	return gulp.src(CONFIG.SRC.IMG, {since: gulp.lastRun('images')})
		.pipe(_.newer(CONFIG.DIST.IMG))
		.pipe(gulp.dest(CONFIG.DIST.IMG))
};