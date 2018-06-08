'use strict';
const CONFIG = require('./gulp.config');

const gulp = require('gulp');
const gulpIf = require('gulp-if');
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
		.pipe(gulp.dest(CONFIG.DIST.ASSETS))
});

gulp.task('default', gulp.series('clean',
	gulp.parallel('sass', 'assets')
));


gulp.watch(CONFIG.SRC.SASS, gulp.series('sass'));
gulp.watch(CONFIG.SRC.ASSETS, gulp.series('assets'));

