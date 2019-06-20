var oSelect = {
	elem: '.js-select',
	dataEl: '.js-select__data',
	triggerEl: '.js-select__trigger',
	list: '.js-select__list',
	listItem: '.js-select__list-item',
	openedClass: 'is-opened',
	init: function(){
		if ( !$(oSelect.elem).length ) return;

		$(oSelect.triggerEl).on('click', oSelect.mTrigger);
		$(oSelect.listItem).on('click', oSelect.mSetValue);
		$(document).on('click', oSelect.closeByClick);
	},
	mTrigger: function(){
		var jSelect = $(this).closest(oSelect.elem);
		jSelect.toggleClass(oSelect.openedClass);
		jSelect.find(oSelect.list).stop().slideDown(300);
	},
	mSetValue: function(){
		var jSelect = $(this).closest(oSelect.elem);

		jSelect.find(oSelect.dataEl).val($(this).index());
		jSelect.find(oSelect.triggerEl).text($(this).text())
		jSelect.removeClass(oSelect.openedClass);
		jSelect.find(oSelect.list).stop().slideUp(300);
	},
	closeByClick: function(e){
		if ( !$(e.target).closest(oSelect.elem).length )
			if ( $(oSelect.elem).hasClass(oSelect.openedClass) )
				$(oSelect.elem).removeClass(oSelect.openedClass).find(oSelect.list).stop().slideUp(300)
	}
};