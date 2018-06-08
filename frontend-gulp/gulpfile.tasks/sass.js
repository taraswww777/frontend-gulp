'use strict';

const gulp = require('gulp');
const _ = require('gulp-load-plugins')();
const combine = require('stream-combiner2').obj;
const CONFIG = require('../gulp.config');


module.exports = () => {
	return combine(
		gulp.src(CONFIG.SRC.SASS),
		_.if(CONFIG.isDev, _.sourcemaps.init()),
		_.sass(),
		_.autoprefixer(),
		_.if(CONFIG.isDev, _.sourcemaps.write()),
		gulp.dest(CONFIG.DIST.SASS)
	).on('error', _.notify.onError());
};
