'use strict';
const CONFIG = require('./gulp.config');

const gulp = require('gulp');
const gulpIf = require('gulp-if');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const sourceMaps = require('gulp-sourcemaps');
const argv = require('yargs').argv;
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');


const isDev = !argv.NODE_ENV || argv.NODE_ENV === 'dev';

let notifyOnError = notify.onError((err) => {
		return {
			title: 'notifyOnError',
			message: err.message
		}
	});

gulp.task('sass', () => {
	return gulp.src(CONFIG.SRC.SASS)
		.pipe(plumber({
			errHandler: notifyOnError
		}))
		.pipe(gulpIf(isDev, sourceMaps.init()))
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulpIf(isDev, sourceMaps.write()))
		.pipe(gulp.dest(CONFIG.DIST.SASS));
});

gulp.task('clean', () => {
	return del(CONFIG.DIST.PATH, {force: true})
});


gulp.task('assets', () => {
	return gulp.src(CONFIG.SRC.ASSETS, {since: gulp.lastRun('assets')})
		.pipe(newer(CONFIG.DIST.ASSETS))
		.pipe(gulp.dest(CONFIG.DIST.ASSETS))
});

gulp.task('images', () => {
	return gulp.src(CONFIG.SRC.IMG, {since: gulp.lastRun('images')})
		.pipe(newer(CONFIG.DIST.IMG))
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		]))
		.pipe(gulp.dest(CONFIG.DIST.IMG))
});

gulp.task('build', gulp.series('clean',
	gulp.parallel('sass', 'assets', 'images')
));

gulp.task('watch', () => {
	gulp.watch(CONFIG.SRC.SASS, gulp.series('sass'));
	gulp.watch(CONFIG.SRC.ASSETS, gulp.series('assets'));
	gulp.watch(CONFIG.SRC.IMG, gulp.series('images'));
});


gulp.task('server', () => {
	browserSync.init({
		server: {
			baseDir: CONFIG.browserSync.baseDir
		}
	});

	browserSync.watch(CONFIG.browserSync.watch).on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'server')));
