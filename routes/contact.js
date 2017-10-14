const email = require('../email');

exports.post = async (ctx) => {
	try {
		const formData = ctx.request.body.fields;

		const name = formData.name.replace(/(<|>)/g, ' ');
		const emailAddress = formData.email.replace(/(<|>)/g, ' ');
		const message = formData.message.replace(/(<|>)/g, ' ');

		const options = {
			text: `name: ${name}\n` +
						`email: ${emailAddress}\n` +
						`message: ${message}\n`,
			html: `<p>name: ${name}</p>` +
						`<p>email: ${emailAddress}</p>` +
						`<p>message: ${message}</p>`,
		};

		if (name || emailAddress || message) {
			try {
				const info = await email.send(Object.assign(email.defaults, options));
				console.log(`Message sent: ${info.messageId}`);
				ctx.body = { msg: 'Message sent' };
			} catch (err) {
				console.log(err);
				ctx.body = { msg: 'Message NOT sent' };
			}
		} else {
			console.log('Empty message. (not sent)');
			ctx.status = 400;
			ctx.body = { msg: 'Empty message. (not sent)' };
		}
	} catch (err) {
		console.log('Server error: contact.js');
		console.log(err);

		ctx.status = 500;
		ctx.body = { msg: 'Server error: contact.js' };
	}
};
