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



//Scroll back to top

(function($) { "use strict";

	$(document).ready(function(){"use strict";
		
		var progressPath = document.querySelector('.progress-wrap path');
		var pathLength = progressPath.getTotalLength();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
		progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
		progressPath.style.strokeDashoffset = pathLength;
		progressPath.getBoundingClientRect();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';		
		var updateProgress = function () {
			var scroll = $(window).scrollTop();
			var height = $(document).height() - $(window).height();
			var progress = pathLength - (scroll * pathLength / height);
			progressPath.style.strokeDashoffset = progress;
		}
		updateProgress();
		$(window).scroll(updateProgress);	
		var offset = 50;
		var duration = 550;
		jQuery(window).on('scroll', function() {
			if (jQuery(this).scrollTop() > offset) {
				jQuery('.progress-wrap').addClass('active-progress');
			} else {
				jQuery('.progress-wrap').removeClass('active-progress');
			}
		});				
		jQuery('.progress-wrap').on('click', function(event) {
			event.preventDefault();
			jQuery('html, body').animate({scrollTop: 0}, duration);
			return false;
		})
		
		
	});
	
})(jQuery); 