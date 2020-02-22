(function() {
	'use strict';

	var section = document.querySelectorAll('section');
	var sections = {};
	var i = 0;

	Array.prototype.forEach.call(section, function(e) {
		sections[e.id] = e.offsetTop;
	});

	scrollSpy();

	window.onscroll = function() {
		scrollSpy();
	};

	function scrollSpy() {
		var scrollPosition =
			document.documentElement.scrollTop || document.body.scrollTop;

		for (i in sections) {
			if (sections[i] <= scrollPosition) {
				var activeLinks = document.querySelector('.active');
				if (activeLinks) {
					activeLinks.setAttribute('class', ' ');
				}

				var activeSection = document.querySelector('a[href*=' + i + ']');

				if (activeSection) {
					activeSection.setAttribute('class', 'active');
				}
			}
		}
	}
})();
