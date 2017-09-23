const Koa = require('koa');

const app = new Koa();

require('./pug')(app);
require('./routes')(app);

app.use(require('koa-static')('public'));

app.listen(80);
