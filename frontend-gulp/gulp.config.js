'use strict';

const PATH_SRC = './src';

const PATH_DIST = '../www/dist';


const config = {
		SRC: {
			PATH: PATH_SRC,
			SASS: PATH_SRC + '/scss/*.{sass,scss}',
			ASSETS: PATH_SRC + '/assets/**',
		},

		DIST: {
			PATH: PATH_DIST,
			CSS: PATH_DIST + '/css',
			ASSETS: PATH_DIST + '/assets',
		}

	}
;

module.exports = config;