'use strict';

const CONFIG = require('../gulp.config');

const gulp = require('gulp');
const _ = require('gulp-load-plugins')();
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const pngquant = require('imagemin-pngquant');


module.exports = () => {
	return gulp.src(CONFIG.SRC.IMG, {since: gulp.lastRun('images')})
		.pipe(_.newer(CONFIG.DIST.IMG))
		.pipe(_.cache(_.imagemin([
			_.imagemin.gifsicle({interlaced: true}),
			_.imagemin.jpegtran({progressive: true}),
			imageminJpegRecompress({
				loops: 5,
				min: 65,
				max: 70,
				quality: 'medium'
			}),
			_.imagemin.svgo(),
			_.imagemin.optipng({optimizationLevel: 3}),
			pngquant({quality: '65-70', speed: 5})
		], {
			verbose: true
		})))
		.pipe(gulp.dest(CONFIG.DIST.IMG))
};