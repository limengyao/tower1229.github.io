var widget = $('#${id}');

base.scanpush();
require('slide');
$('.widget-history-6-slide').slide({
	act:'click'	,
	auto:false,
	callback:function(o,b,n){

	},
	ext:function(o,b,nav){
		b.filter('.active').css('left','0');
		b.filter('.ban_next').css('left','100%');
		b.filter('.ban_prev').css('left','-100%');
		
	}
})	



