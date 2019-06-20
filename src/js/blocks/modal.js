var oModal = {
	scrollValue: 0,
	bodyScrollTop: null,
	init: function(){
		var oThis = this;

		$(document).on('click', '[data-modal]', function(e){
			e.preventDefault();
			oThis.open( $(this).data('modal') );
		});

		oThis.closeX();
		oThis.closeOnOverlay();
	},
	open: function(modalName){
		var oThis   = this,
			timeOut = 0;

		if ( $('.modal').is(':visible') ){
			timeOut = 600;
			this.close();
		}

		var overlay      = '<div class="modal-backdrop"></div>',
			currentModal = $('.' + modalName),
			modal        = currentModal.children('.modal__content'),
			posTop       = 0;

		setTimeout(function(){
			// debugger;
			oThis.scrollValue = $(document).scrollTop();
			$('body').append(overlay);
			oThis.bodyScrollTop = (typeof window.pageYOffset !== 'undefined') ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

			$('body').addClass('modal-open').css({
				'paddingRight': oScreen.getScrollBarWidth() + 'px',
				'top': (1 - (oModal.bodyScrollTop + 1))
			});

			posTop = ($(window).height() - modal.outerHeight()) / 2;
			modal.css({
				top: posTop > 0 ? posTop + 'px' : 20 + 'px'
			});
			currentModal.fadeIn();
		},timeOut);
	},
	close: function() {
		var currentModal = $('.modal:visible'),
			modal        = currentModal.children('.modal__content');

		currentModal.fadeOut(function(){
			$('body').removeClass('modal-open');
			$('body').css({ paddingRight: 0, top: 0});
			window.scrollTo(0, oModal.bodyScrollTop);
			$('.modal-backdrop').remove();
			modal.removeAttr('style');
		});
	},
	closeX: function(){
		var oThis = this;

		$(document).on('click', '.js-modal-close', function(){
			oThis.close();
		});

		$(document).on('keyup', function (event) {
			var key            = event.keyCode,
				modalVisible = $('.modal:visible').length;

			if ( modalVisible && key == 27 ) oThis.close();
		});
	},
	closeOnOverlay: function(){
		$(document).on('click', '.modal', function (e) {
			if ( $(this).is(':visible') && !$(e.target).closest('.modal__content').length )
				oModal.close();
		});
	}
};