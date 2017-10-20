const Pug = require('koa-pug');

module.exports = (app) => {
	Pug({
		viewPath: './views',
		debug: false,
		pretty: false,
		compileDebug: false,
		app,
	});
};
