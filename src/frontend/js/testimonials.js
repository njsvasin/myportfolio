const testimonials = document.querySelectorAll('[data-rotator-content]');
const testimonialsLength = testimonials.length;
const animationDuration = 8000;

let current = 0;

testimonials[current].classList.add('current');

setInterval(() => {
	current += 1;

	if (current >= testimonialsLength) {
		current = 0;
	}

	testimonials.forEach((testimonial) => {
		testimonial.classList.remove('current');
	});

	testimonials[current].classList.add('current');
}, animationDuration);
