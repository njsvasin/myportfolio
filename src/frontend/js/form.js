const form = document.querySelector('[data-contact-form]');

form.addEventListener('submit', (event) => {
	event.preventDefault();

	let formData = new FormData(form);

	fetch('/contact', {
		method: 'POST',
		body: formData,
	})
		.then(res => res.json())
		.then((data) => {
			if (data && data.msg) {
				console.log(data.msg);
			} else {
				console.log(data);
			}
		})
		.catch((err) => {
			console.error(err);
		});
});
