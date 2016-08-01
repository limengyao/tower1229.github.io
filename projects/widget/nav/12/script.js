//扫描按需加载
base.scanpush();

//nav
var _li = $('#menu').children('ul').children('li:not(:first)');
if(base.getType()!=='Mobile'){
	_li.each(function(i,e){
		i = i+1;
		$(this).addClass('nav'+i);
	});
	$('#menu').children('ul').find('li:last-child').addClass('last')
	_li.mouseenter(function(){
		$('.setWrapbg').fadeIn('fast');
		$(this).addClass('hover').find('._layer').slideDown();
		
	}).mouseleave(function(){
		$(this).removeClass('hover').find('._layer').slideUp();
		$('.setWrapbg').fadeOut('fast');
	});
}else{
	_li.each(function(i,e) {
        $(this).children('a').after($(this).find('ul'));
		$(this).find('._layer').remove();
    });
	require('offcanvas');
	$('.widget-nav').offcanvas();
}
