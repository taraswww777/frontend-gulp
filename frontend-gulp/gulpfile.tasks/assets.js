'use strict';

const CONFIG = require('../gulp.config');

const gulp = require('gulp');
const _ = require('gulp-load-plugins')();


module.exports = () => {
	return gulp.src(CONFIG.SRC.ASSETS, {since: gulp.lastRun('assets')})
		.pipe(_.newer(CONFIG.DIST.ASSETS))
		.pipe(gulp.dest(CONFIG.DIST.ASSETS))
};
