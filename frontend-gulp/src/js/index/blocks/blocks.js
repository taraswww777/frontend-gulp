import $ from 'jquery';
// import jQueryBridget from 'jquery-bridget';
// import magnificPopup from 'magnific-popup';
import 'magnific-popup';
import 'owl.carousel';
// import Isotope from 'isotope-layout';
// import '@fancyapps/fancybox';

// jQueryBridget( 'magnificPopup', magnificPopup, $ );


// import Inputmask from 'inputmask';
// import Headhesive from 'headhesive';
$(document).ready(() => {
	let popupOptions = {
		delegate: 'a',
		type: 'image',
		tLoading: 'Загрузка изображения #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
			tCounter: '%curr% из %total%',
		},
		image: {
			tError: '<a href="%url%"> #%curr%</a> ',
			titleSrc:

				function (item) {
					return item.el.attr('title');
				}
		}
	};
	let galleries = [
		'.popup-gallery--object',
		'.popup-gallery--certificates',
		'.gallery',
		'.card__item__wrapper-pic',
	];

	$.each(galleries, (item, el) => {
		$(el).magnificPopup(popupOptions);
	});


	$('.owl-carousel').owlCarousel({
		margin: 30,
		nav: true,
		dots: false,
		loop: true,
		items: 4,
	});
});
