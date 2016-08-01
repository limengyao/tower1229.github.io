var widget = $('#${id}');
widget.find('li').hover(function(e) {
	$(this).addClass('hover');
},function(e) {
	$(this).removeClass('hover');
});