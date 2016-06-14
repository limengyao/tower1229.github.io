var widget = $('#${id}'),
    imgWrap = widget.find('._img'),
    imgList = widget.find('._album_list'),
    albumAct = '${albumAct.value}';

imgList.on(albumAct, 'li', function() {
    var _img = $('<img class="_full" src="' + $(this).find('.album_img').data('img') + '" >');
    imgWrap.html(_img);
    $(this).addClass('active').siblings().removeClass('active');
}).find('li').eq(0).trigger(albumAct);



require('tab');
widget.tab();