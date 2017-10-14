const nodemailer = require('nodemailer');
const config = require('../config');

const transport = nodemailer.createTransport({
	host: config.get('email:host'),
	port: config.get('email:port'),
	secure: config.get('email:secure'),
	auth: {
		user: config.get('email:auth:user'),
		pass: config.get('email:auth:pass'),
	},
});

const mailOptions = {
	from: config.get('email:from'),
	to: config.get('email:to'),
	subject: config.get('email:subject'),
	text: 'empty',
	html: '<b>empty</b>',
};

module.exports = {
	defaults: mailOptions,
	send: options => new Promise((resolve, reject) => {
		transport.sendMail(options, (err, info) => {
			if (err) {
				reject(err);
			} else {
				resolve(info);
			}
		});
	}),
};
