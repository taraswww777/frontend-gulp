'use strict';

const CONFIG = require('../gulp.config');
const del = require('del');

module.exports =  ()=> {
	return del(CONFIG.DIST.PATH, {force: true})
};
