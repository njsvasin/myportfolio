const config = require('./config');
const Koa = require('koa');

const app = new Koa();

require('./pug')(app);
require('./routes')(app);

app.use(require('koa-static')('public'));

const server = app.listen(config.get('port'), () => {
	const port = server.address().port;
	console.log(`Koa is working on port ${port}`);
});
