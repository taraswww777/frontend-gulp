'use strict';

const gulp = require('gulp');
const _ = require('gulp-load-plugins')();
const combine = require('stream-combiner2').obj;
const sourceMaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const CONFIG = require('../gulp.config');


module.exports = function () {
	return combine(
		gulp.src(CONFIG.SRC.SASS),
		_.if(CONFIG.isDev, sourceMaps.init()),
		_.sass(),
		_.autoprefixer(),
		_.if(CONFIG.isDev, sourceMaps.write()),
		gulp.dest(CONFIG.DIST.SASS)
	).on('error', notify.onError());
};
