const koaBody = require('koa-body')({ multipart: true });
const Router = require('koa-router');

const router = new Router();

module.exports = (app) => {
	router.get('/', require('./frontpage').get);

	router.post('/contact', koaBody, require('./contact').post);

	app.use(router.routes());
};
