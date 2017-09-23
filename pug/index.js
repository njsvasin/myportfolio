const Pug = require('koa-pug');

module.exports = (app) => {
  new Pug({
    viewPath: './views',
    debug: false,
    pretty: false,
    compileDebug: false,
    app,
  });
};
