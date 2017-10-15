const nconf = require('nconf');
const path = require('path');

nconf
	.argv()
	.env()
	.file('file', path.join(__dirname, 'config.json'))
	.file('package_file', path.join(__dirname, '../package.json'));

module.exports = nconf;
