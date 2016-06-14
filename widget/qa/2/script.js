var widget = $('#${id}');

widget.on('click','.widget-qa-3-title',function() {
	$(this).next('.widget-qa-3-content').slideDown(128).siblings('.widget-qa-3-content:visible').slideUp(128);
	$(this).addClass('_icoActive').siblings().removeClass('_icoActive');
}).find('.widget-qa-3-title').eq(0).trigger('click');