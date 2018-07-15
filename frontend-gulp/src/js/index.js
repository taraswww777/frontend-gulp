import $ from 'jquery';

function requireAll(r) {
	r.keys().map(r);
}

requireAll(require.context('./index/', true, /^\.\/[^/]+\/[^/.]+\.(js)$/));