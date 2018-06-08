'use strict';

const gulp = require('gulp');
const _ = require('gulp-load-plugins')();
const combine = require('stream-combiner2').obj;
const CONFIG = require('../gulp.config');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');


module.exports = () => {
	return combine(
		gulp.src(CONFIG.SRC.SASS),
		_.if(CONFIG.isDev, _.sourcemaps.init()),
		_.sass(),
		_.autoprefixer(),
		_.if(CONFIG.isDev, _.sourcemaps.write()),
		_.if(!CONFIG.isDev, combine(cssnano(), rev())),
		gulp.dest(CONFIG.DIST.SASS),
		_.if(!CONFIG.isDev, combine(rev.manifest('css.json'), gulp.dest(CONFIG.MANIFEST.CSS))),
	).on('error', _.notify.onError());
};
