var widget = $('#${id}');
widget.find('li').hover(function(e) {
	$(this).find('._fbg').stop(1,1).fadeIn();
},function(e) {
	$(this).find('._fbg').stop(1,1).fadeOut();
});