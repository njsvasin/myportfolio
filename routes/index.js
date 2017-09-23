const Router = require('koa-router');

const router = new Router();

module.exports = (app) => {
  router.get('/', require('./frontpage').get);

  app.use(router.routes());
};
