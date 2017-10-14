// todo: only for mobile!
const nav = document.querySelector('[data-nav]');
const navMenu = document.querySelector('[data-nav-menu]');
const navToggler = document.querySelector('[data-toggle="collapse"]');

nav.addEventListener('click', (event) => {
	if (event.target.closest('[data-toggle="collapse"]') === navToggler) {
		navMenu.classList.toggle('nav__menu--expanded');
	} else {
		navMenu.classList.remove('nav__menu--expanded');
	}
});
