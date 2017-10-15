const config = require('../config');

exports.get = (ctx) => {
	ctx.render('frontpage', { version: config.get('version') });
};
