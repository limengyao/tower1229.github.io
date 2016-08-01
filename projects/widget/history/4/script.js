var widget = $('#${id}');



	/*
	* History-H4 滚动选项卡
	*/
	require.async('scroll-col',function(){
		$('.widget-history-4-T').scrollCol({
			auto:false,
			mode:'unloop',
			ext:function(){
				require.async('tab',function(){
					$('.widget-history-4-tab').tab({
						act:'click',
						callback:function(o,t,i){
							var _left = $('.widget-history-4-tab').width()/2 - (t.width() * (i + 0.5) + (t.outerWidth(true) - t.width()) * i);
							o.find('.scroll_wrap').animate({left:_left},256).end().find('.tab_c').eq(i).find('li').css('opacity','0').each(function(i,e){
						 setTimeout(function(){
							 $(e).animate({'opacity':'1'},200)
							 },i*200)
						 })
							
						}
					})	
				});
			}
		});
	});
        
