var base = require('base');

	if(base.getType() !== 'Mobile') {
		require('img-loaded');
		var widget = $('#${id}');
		widget.imagesLoaded(function(){
			var p6ListHeight = widget.find('._list').height();
			widget.find('.widget-prolist-6-cell').each(function(i, e) {
				var _ulHeight = $(this).find('ul').height();
				$(e).css({
					'z-index':50-i,
					'height':$(e).height()
				})
				if(_ulHeight>p6ListHeight) {
					$(e)
					.data('plus',true)
					.find('._mark').show().end()
					.on({
						'mouseenter':function(){
							$(this).find('._mark').hide().end().find('._list').animate({height:_ulHeight},256)	
						}	,
						'mouseleave':function(){
							$(this).find('._list').animate({height:p6ListHeight},256,function(){
								$(this).parent().find('._mark').show();
							})	
						}
					})
				}
			});
		});
		
	}