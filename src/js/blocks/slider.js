var oSlider = {
	slider: '.js-slider',
	item: '.js-slider-item',
	next: '.js-slider-next',
	pagination: '.js-slider-pagination',
	activeClass: 'is-active',
	Hero: {
		slider: '.slider_hero',
		activeInd: 0,
		itemsLen: 0,
		slides: [],
		activeSlide: null,
		// interval: null,
		// intervalTime: 10000,
		init: function(){
			var oThis = this;

			if ( !$(oSlider.slider + oThis.slider).length ) return;

			oThis.slides      = $(oSlider.slider + oThis.slider).find(oSlider.item);
			oThis.itemsLen    = oThis.slides.length;
			oThis.activeSlide = $(oSlider.slider + oThis.slider).find('.'+oSlider.activeClass);
			oThis.activeInd   = oThis.activeSlide.index();

			// oThis.setAutoslideInterval();

			$(oSlider.next).on('click', oThis.goTo);

			var dxStart = dxEnd = touchDist = 0;

			$(oSlider.item).on('touchstart', function(e){
				dxStart    = e.touches[0].clientX;
			}).on('touchend', function(e){
				dxEnd     = e.changedTouches[0].clientX;
				touchDist = dxEnd - dxStart;

				if ( Math.abs(touchDist) > 50 ){
					( touchDist < 0 ) ? oThis.goTo('next') : oThis.goTo('prev');

					return;
				}
			})

			// Очистка интервала
			// $(oSlider.item).on('mouseenter', function() {
			// 	clearInterval(oThis.interval);
			// 	console.log('mouseenter')
			// }).on('mouseleave', function() {
			// 	oThis.setAutoslideInterval();
			// 	console.log('mouseleave')
			// });
		},
		// Интервал автоматического пролистывания
		// setAutoslideInterval: function(){
		// 	var oThis = oSlider.Hero;

		// 	oThis.interval = setInterval(function(){
		// 		oThis.goNext();
		// 	}, oThis.intervalTime);
		// },
		goTo: function(dir){
			var oThis = oSlider.Hero,
				sDirection = "";

			(typeof dir != 'string') ? sDirection = 'next': sDirection = dir;

			// clearInterval(oThis.interval);

			if ( sDirection == 'next' ){
				if ( oThis.activeInd != ( oThis.itemsLen - 1) ){
					$( oThis.slides[oThis.activeInd] ).removeClass(oSlider.activeClass)
													  .next().addClass(oSlider.activeClass);
					oThis.activeInd++;
				} else {
					$( oThis.slides[oThis.activeInd] ).removeClass(oSlider.activeClass);
					$( oThis.slides[0] ).addClass(oSlider.activeClass);
					oThis.activeInd = 0;
				}
			} else {
				if ( oThis.activeInd != 0 ){
					$( oThis.slides[oThis.activeInd] ).removeClass(oSlider.activeClass)
													  .prev().addClass(oSlider.activeClass);
					oThis.activeInd--;
				} else {
					$( oThis.slides[oThis.activeInd] ).removeClass(oSlider.activeClass);
					$( oThis.slides[oThis.itemsLen-1] ).addClass(oSlider.activeClass);
					oThis.activeInd = oThis.itemsLen-1;
				}
			}
			oThis.setActivePagDot();

			// oThis.setAutoslideInterval();

			return false;
		},
		setActivePagDot: function(){
			var oThis = oSlider;

			$(oThis.pagination).children().removeClass(oThis.activeClass);
			$(oThis.pagination).children().eq(oThis.Hero.activeInd).addClass(oThis.activeClass);
		}
	},
	Default: {
		sliderSel: '.slider_default',
		init: function(){
			var oThis = this;
			var arrowsType = "default";
			var responsive = null;

			$(oThis.sliderSel).each(function(index, el) {
				switch ($(el).data('arrowsType')) {
					case 1:
						arrowsType = 'type1';
						break;
					case 2:
						arrowsType = 'type2';
						break;
				}

				if ( $(el).hasClass('slider_cards-type2') ){
					responsive = [
						{
							breakpoint: 961,
							settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: true }
						},
						{
							breakpoint: 761,
							settings: { slidesToShow: 2, slidesToScroll: 2, infinite: true, dots: true }
						},
						{
							breakpoint: 481,
							settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true, dots: true }
						}
					];
				} else if ( $(el).is('.slider_default:not(.slider_news):not([data-chained])') ){
					responsive = [
						{
							breakpoint: 961,
							settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: true }
						},
						{
							breakpoint: 761,
							settings: { slidesToShow: 2, slidesToScroll: 2, infinite: true, dots: true, arrows: false }
						},
						{
							breakpoint: 481,
							settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true, dots: true, arrows: false }
						}
					];
				} else if ( $(el).is('.slider_news') ){
					responsive = [
						{
							breakpoint: 761,
							settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true, dots: true, arrows: false }
						}
					];
				}

				$(el).slick({
					infinite: true,
					slidesToShow: parseInt($(el).data('visItems')) || 2,
					slidesToScroll: parseInt($(el).data('slideItems')) || 2,
					dots: $(el).data('dots') || false,
					autoplay: $(el).data('autoplay') || true,
					autoplaySpeed: parseInt($(el).data('autoplaySpeed')) || 5000,
					accessibility: false,
					pauseOnFocus: true,
					pauseOnHover: true,
					swipeToSlide: true,
					fade: $(el).data('fade') || false,
					asNavFor: ( $(el).data('chained') ) ? $(el).data('chained') : false,
					centerMode: $(el).data('center') || false,
					focusOnSelect: $(el).data('focusOnSelect') || false,
					swipe: true,
					touchThreshold: 50,
					variableWidth: ( $(el).data('variableWidth') ) ? $(el).data('variableWidth') : false,
					arrows: ( $(el).data('hideArrows') ) ? false : true,
					prevArrow: '<div class="slider__arrow slider__arrow_prev slider__arrow_'+arrowsType+'">'
							 +   '<svg class="icon icon_slider-prev_'+arrowsType+'">'
							 +     '<use xlink:href="#slider-arrow-prev_'+arrowsType+'"></use>'
							 +   '</svg>'
							 + '</div>',
					nextArrow: '<div class="slider__arrow slider__arrow_next slider__arrow_'+arrowsType+'">'
							 +   '<svg class="icon icon_slider-next_'+arrowsType+'">'
							 +     '<use xlink:href="#slider-arrow-next_'+arrowsType+'"></use>'
							 +   '</svg>'
							 + '</div>',
					responsive: responsive
				});
			});
		}
	}
};