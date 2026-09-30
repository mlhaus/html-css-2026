const mobileNav = document.getElementById('mobile-nav');
const mainMenu = document.getElementById('main-menu');

if (mobileNav && mainMenu) {
	mobileNav.setAttribute('role', 'button');
	mobileNav.setAttribute('tabindex', '0');
	mobileNav.setAttribute('aria-controls', 'main-menu');
	mobileNav.setAttribute('aria-expanded', 'true');

	const toggleMainMenu = () => {
		const isOpen = mainMenu.classList.toggle('is-closed') === false;
		mobileNav.setAttribute('aria-expanded', String(isOpen));
	};

	mobileNav.addEventListener('click', toggleMainMenu);
	mobileNav.addEventListener('keydown', (event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			toggleMainMenu();
		}
	});
}
