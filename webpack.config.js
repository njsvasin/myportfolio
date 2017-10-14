const NODE_ENV = process.env.NODE_ENV || 'development';

let config = {};

if (NODE_ENV === 'development') {
	config = require('./webpack.dev.config');
} else if (NODE_ENV === 'production') {
	config = require('./webpack.prod.config');
}

module.exports = config;
