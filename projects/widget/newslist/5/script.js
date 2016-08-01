
	/*
	* NewsList-A6 
	* 第一个默认展开
	*/
	$('.NewsList-A6').find('li').on({
		'mouseenter':function(){
			$(this).addClass('hover').siblings().removeClass('hover')
		}
	}).eq(0).addClass('hover');
    