//扫描按需加载
base.scanpush();

//nav
var _li = $('#menu').children('ul').children('li');
if(base.getType()!=='Mobile'){
	_li.each(function(i,e){
		i = i+1;
		$(this).addClass('nav'+i);
	});
	$('#menu').children('ul').find('li:last-child').addClass('last')
	_li.mouseenter(function(){
		$(this).addClass('hover');
	}).mouseleave(function(){
		$(this).removeClass('hover');
	});
	_li.find('.secNav').mouseenter(function() {
        $(this).addClass('sec_hover');
		$(this).children('ul').stop().slideDown();
    }).mouseleave(function(){
			$(this).removeClass('sec_hover');
			$(this).children('ul').stop().slideUp();
		});
}else{
	/*_li.each(function(i,e) {
        $(this).children('a').after($(this).find('ul'));
		$(this).find('._layer').remove();
    });*/
	require('offcanvas');
	$('.widget-nav').offcanvas();
}
