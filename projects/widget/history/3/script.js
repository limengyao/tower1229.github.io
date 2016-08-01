var widget = $('#${id}');


require('scroll-col');
$('.widget-history-3-T').scrollCol({
	prev:'.widget-history-3_prev',
	next:'.widget-history-3_next',
	auto:false,
	mode:'unloop',
	ext:function(){
		require.async('tab',function(){
			$('.widget-history-3-tab').tab({
				posi_auto:false
			})	
		});
	}
});

