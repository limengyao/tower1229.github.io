if(base.getType() == 'Pc'){
	$('#${id}').on('mouseenter', '._at', function() {
		$(this).parent('li').addClass('hover').siblings().removeClass('hover');
	}).find('._at').eq(0).trigger('mouseenter');
}else{
	$('#${id}').on('click', '._at', function(e) {
		e.preventDefault();
		$(this).parent('li').addClass('hover').siblings().removeClass('hover');
	}).find('._at').eq(0).trigger('click');
}