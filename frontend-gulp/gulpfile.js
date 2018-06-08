'use strict';

const CONFIG = require('./gulp.config');

const gulp = require('gulp');


function lazyLoadTasks(taskName) {
	let task = require(CONFIG.gulp_tasks + taskName);
	gulp.task(taskName, task)
}

lazyLoadTasks('sass');
lazyLoadTasks('clean');
lazyLoadTasks('assets');
lazyLoadTasks('images');
lazyLoadTasks('server');


gulp.task('build', gulp.series('clean',
	gulp.parallel('sass', 'assets', 'images')
));

gulp.task('watch', () => {
	gulp.watch(CONFIG.SRC.SASS, gulp.series('sass'));
	gulp.watch(CONFIG.SRC.ASSETS, gulp.series('assets'));
	gulp.watch(CONFIG.SRC.IMG, gulp.series('images'));
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'server')));
