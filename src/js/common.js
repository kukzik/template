var oClassToggler = {
	selector: '.js-class-toggler',
	init: function(){
		if ( !$(oClassToggler.selector).length ) return;

		$(oClassToggler.selector).on('click', oClassToggler.toggle);
	},
	toggle: function(){
		var oThis = oClassToggler;

		var jThis         = $(this),
			jToggleTarget = jThis.data('target'),
			sToggleClass  = jThis.data('class'),
			bDirectTarget = jThis.data('direct');

		if ( bDirectTarget )
			jThis.closest(jToggleTarget).toggleClass(sToggleClass);
		else
			$(jToggleTarget).toggleClass(sToggleClass);

		return false;
	}
};

var oIsTouch = {
	init: function(){

		if (this.is_touch_device() )
			$('body').addClass('is-touch-device');
	},
	is_touch_device: function () {
		var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
		var mq = function(query) {
				return window.matchMedia(query).matches;
		}

		if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
				return true;
		}
		var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
		return mq(query);
	}
};

var oScreen = {
	getScrollBarWidth: function(){

		var inner = document.createElement("p");
		inner.style.width = "100%";
		inner.style.height = "200px";

		var outer = document.createElement("div");
		outer.style.position = "absolute";
		outer.style.top = "0px";
		outer.style.left = "0px";
		outer.style.visibility = "hidden";
		outer.style.width = "200px";
		outer.style.height = "150px";
		outer.style.overflow = "hidden";
		outer.appendChild (inner);

		document.body.appendChild (outer);
		var w1 = inner.offsetWidth;
		outer.style.overflow = "scroll";
		var w2 = inner.offsetWidth;
		if (w1 == w2) w2 = outer.clientWidth;

		document.body.removeChild (outer);

		return (w1 - w2);
	}
};