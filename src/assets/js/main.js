(function() {
	('use strict');

	// Call scrollSpy on load to set section nav active
	scrollSpy();
	// Initialise google map
	mapInit();
	// Run parallax code for community section
	// communityAnim(); // TODO - reenable
	// Run parallax code for menu section
	// menuAnim(); // TODO - reenable

	// On scroll event
	window.onscroll = function() {
		// Run scrollSpy
		scrollSpy();
	};
})();

/** Updates section nav active state based on section in viewport */
function scrollSpy() {
	// Get all sections from document
	const section = document.querySelectorAll('section');
	// Create a store for section ids and offsets
	let sections = {};

	// Loop through each section
	Array.prototype.forEach.call(section, function(e) {
		// Add to store with section id and pixel offset from top
		sections[e.id] = e.offsetTop - 50;
	});

	// Get current scroll position
	const scrollPosition =
		document.documentElement.scrollTop || document.body.scrollTop;

	// Loop through each section from our store
	for (let i in sections) {
		// If section is in the viewport
		if (sections[i] <= scrollPosition) {
			// Select all active section nav anchors
			const activeLinks = document.querySelector('.active');
			// If we have active section nav anchors
			if (activeLinks) {
				// Remove active class
				activeLinks.setAttribute('class', ' ');
			}

			// Select all anchors with href of active section's id
			const activeSection = document.querySelector('a[href*=' + i + ']');
			// If we have anchors to make active
			if (activeSection) {
				// Add active class
				activeSection.setAttribute('class', 'active');
			}
		}
	}
}

function mapInit() {
	// When the window has finished loading create our google map below
	google.maps.event.addDomListener(window, 'load', init);

	function init() {
		// Set map options
		const mapOptions = {
			// How zoomed in you want the map to start at (always required)
			zoom: 13.8,
			// The latitude and longitude to center the map (always required)
			center: new google.maps.LatLng(51.51244, -0.113916),
			// Hide map controls
			disableDefaultUI: true,
			// Snazzy Maps styling
			styles: [
				{
					featureType: 'all',
					elementType: 'geometry.fill',
					stylers: [{ lightness: '-100' }, { color: '#ffdac9' }]
				},
				{
					featureType: 'poi',
					elementType: 'geometry.fill',
					stylers: [{ visibility: 'on' }, { color: '#ffcab1' }]
				},
				{
					featureType: 'poi',
					elementType: 'labels',
					stylers: [{ visibility: 'off' }]
				},
				{
					featureType: 'poi.park',
					elementType: 'geometry.fill',
					stylers: [{ color: '#ffcab1' }]
				},
				{
					featureType: 'road',
					elementType: 'geometry',
					stylers: [{ lightness: 100 }, { visibility: 'simplified' }]
				},
				{
					featureType: 'road',
					elementType: 'labels',
					stylers: [{ visibility: 'off' }]
				},
				{
					featureType: 'transit.line',
					elementType: 'geometry',
					stylers: [{ visibility: 'on' }, { lightness: 700 }]
				},
				{
					featureType: 'water',
					elementType: 'all',
					stylers: [{ color: '#92e1dd' }]
				}
			]
		};

		// Get the HTML DOM element that will contain your map
		// We are using a div with id="map" seen below in the <body>
		const mapElement = document.getElementById('map');

		// Create the Google Map using our element and options defined above
		const map = new google.maps.Map(mapElement, mapOptions);

		// Add restaurant location marker to map
		new google.maps.Marker({
			position: new google.maps.LatLng(51.51244, -0.126916),
			map: map,
			icon: '/dist/assets/png/location.png'
		});
	}
}

/** Scrollmagic/gsap animation for community section */
function communityAnim() {
	// Initialise scrollmagic controller
	const controller = new ScrollMagic.Controller();

	// Create container animation timeline
	const tweenContainer = new TimelineMax().add([
		TweenMax.to('.section-community .container', 1, {
			y: 400
		})
	]);

	// Build scrollmagic container scene
	new ScrollMagic.Scene({
		triggerElement: '.section-community',
		offset: window.innerHeight / 2,
		duration: window.innerHeight
	})
		.setTween(tweenContainer)
		.addTo(controller);

	// Create row 1 animation timeline
	const tweenRow1 = new TimelineMax().add([
		TweenMax.to('.section-community article:not(.intro):nth-child(-n+4)', 1, {
			y: -400
		})
	]);

	// Build scrollmagic row 1 scene
	new ScrollMagic.Scene({
		triggerElement: '.section-community',
		offset: window.innerHeight / 2 - 250,
		duration: 800
	})
		.setTween(tweenRow1)
		.addTo(controller);

	// Create row 2 animation timeline
	const tweenRow2 = new TimelineMax().add([
		TweenMax.to(
			'.section-community article:not(.intro):nth-child(-n+8):nth-last-child(-n+8)',
			1,
			{
				y: -400
			}
		)
	]);

	// Build scrollmagic row 2 scene
	new ScrollMagic.Scene({
		triggerElement: '.section-community',
		offset: window.innerHeight / 2 - 125,
		duration: 800
	})
		.setTween(tweenRow2)
		.addTo(controller);

	// Create row 3 animation timeline
	const tweenRow3 = new TimelineMax().add([
		TweenMax.to('.section-community article:not(.intro):nth-child(-n+12)', 1, {
			y: -400
		})
	]);

	// Build scrollmagic row 3 scene
	new ScrollMagic.Scene({
		triggerElement: '.section-community',
		offset: window.innerHeight / 2,
		duration: 800
	})
		.setTween(tweenRow3)
		.addTo(controller);
}

/** Scrollmagic/gsap animation for menu section */
function menuAnim() {
	// Initialise scrollmagic controller
	const controller = new ScrollMagic.Controller();

	// Create container animation timeline
	const tweenContainer = new TimelineMax().add([
		TweenMax.to('.section-menu .container', 1, {
			y: 200
		})
	]);

	// Build scrollmagic container scene
	new ScrollMagic.Scene({
		triggerElement: '.section-menu',
		offset: 400,
		duration: 600
	})
		.setTween(tweenContainer)
		.addTo(controller);

	// Create entry animation timeline
	const tweenEntry = new TimelineMax().add([
		// Define up scrolling article animations
		TweenMax.to('.section-menu .up', 1, {
			y: -window.innerHeight * 0.75
		}),
		TweenMax.to('.section-menu .down', 1, {
			y: window.innerHeight
		})
	]);

	// Build scrollmagic entry scene
	new ScrollMagic.Scene({
		triggerElement: '.section-menu',
		offset: 0,
		duration: 400
	})
		.setTween(tweenEntry)
		.addTo(controller);

	// Create exit animation timeline
	const tweenExit = new TimelineMax().add([
		// Define up scrolling article animations
		TweenMax.to('.section-menu .up', 1, {
			y: window.innerHeight * 0.75
		}),
		TweenMax.to('.section-menu .down', 1, {
			y: -window.innerHeight
		})
	]);

	// Build scrollmagic exit scene
	new ScrollMagic.Scene({
		triggerElement: '.section-menu',
		offset: 500,
		duration: 800
	})
		.setTween(tweenExit)
		.addTo(controller);
}
