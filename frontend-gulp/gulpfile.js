'use strict';
const CONFIG = require('./gulp.config');

const gulp = require('gulp');
const gulpIf = require('gulp-if');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');// компиляция sass/scss  в css
const sourceMaps = require('gulp-sourcemaps');
const argv = require('yargs').argv;
const del = require('del');


const isDev = !argv.NODE_ENV || argv.NODE_ENV === 'dev';

console.log('isDev: ', isDev);

gulp.task('sass', () => {
	return gulp.src(CONFIG.SRC.SASS)
		.pipe(gulpIf(isDev, sourceMaps.init()))
		.pipe(sass())
		.pipe(gulpIf(isDev, sourceMaps.write()))
		.pipe(gulp.dest(CONFIG.DIST.CSS));
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


gulp.task('dev', gulp.series('build', 'watch'));