(function() {
	// Create the devicecheck element
	var div = document.createElement('div');
	div.setAttribute('id', 'devicecheck');
	document.body.appendChild(div);

	// Trigger update on resize
	var delay;
	window.addEventListener('resize', function() {
		clearTimeout(delay);
		delay = setTimeout(window_is_sizeUpdate, 250);
	});

	window_is_sizeUpdate(); // Init

	// Update variables
	function window_is_sizeUpdate() {
		var devicecheck = window.getComputedStyle(document.getElementById("devicecheck")).getPropertyValue("content");

		window.is_desktop = false;
		window.is_tablet =  false;
		window.is_mobile =  false;

		if (devicecheck == "\"desktop\"" || devicecheck == "desktop") window.is_desktop = true;
		if (devicecheck == "\"tablet\""  || devicecheck == "tablet") window.is_tablet =   true;
		if (devicecheck == "\"mobile\""  || devicecheck == "mobile") window.is_mobile =   true;
	};
})();

// Open and close adaptive/responsive navigations
(function() {
	let navigationToggles = document.querySelectorAll('.navigation-toggle');

	for (var i = navigationToggles.length - 1; i >= 0; i--) {
		setupNav(navigationToggles[i]);
	}

	function setupNav(navToggle) {
		var nav = document.querySelector(navToggle.getAttribute('target'));

		// Setup adaptive horizontal navigation
		if (nav.classList.contains('navigation-hor-adaptive')) {
			createVertNav(nav, navToggle);
		} else {
			bindNavToggle(nav, navToggle);
		}
	}

	function bindNavToggle(nav, navToggle) {
		// Create backdrop
		var backdrop = document.createElement('div');
		backdrop.classList.add('navigation-backdrop');
		document.body.appendChild(backdrop);
		backdrop.addEventListener('click', function() {
			toggleNav(nav, backdrop);
		});

		// Setup toggle for button
		navToggle.addEventListener('click', function(e) {
			e.preventDefault();
			toggleNav(nav, backdrop);
		});
	}

	function toggleNav(nav, backdrop) {
		if (nav.classList.contains('open')) {
			nav.classList.remove('open');
			backdrop.classList.remove('open');
		} else {
			nav.classList.add('open');
			backdrop.classList.add('open');
		}
	}

	function createVertNav(nav, navToggle) {
		// Find menu
		var menu = nav.querySelector('.navigation-menu');
		var navInnerWrapper = nav.querySelector('.navigation-wrapper-inner');

		// Create elements
		var vertNav = document.createElement('nav');
		vertNav.classList.add('navigation', 'navigation-vert', 'navigation-vert-right');
		var vertNavInnerWrapper = document.createElement('div');
		vertNavInnerWrapper.classList.add('navigation-wrapper-inner');

		// Append elements to page
		vertNav.appendChild(vertNavInnerWrapper);
		document.body.appendChild(vertNav);

		bindNavToggle(vertNav, navToggle);

		var lastSize = 'desktop';
		if (window.is_mobile || window.is_tablet) {
			lastSize = 'mobile/tablet';
			sizeChanged();
		}

		var delay;
		window.addEventListener('resize', function() {
			clearTimeout(delay);
			delay = setTimeout(sizeChanged, 250);
		});

		function sizeChanged() {
			if (window.is_mobile || window.is_tablet) {
				var newSize = 'mobile/tablet';
			} else if (window.is_desktop) {
				var newSize = 'desktop';
			}

			if (lastSize != newSize) {
				// If navigation is bigger than body, send menu items to the other navigation
				if (nav.scrollWidth > document.body.clientWidth) {
					vertNavInnerWrapper.appendChild(nav.querySelector('.navigation-menu'));
				} else {
					navInnerWrapper.appendChild(vertNav.querySelector('.navigation-menu'));
				}
			}

			lastSize = newSize;
		}
	};
})();
