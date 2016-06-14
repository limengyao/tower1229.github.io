/*
* 增加下一页背景图预取功能
* 2015-08-21
*/

define(function (require, exports, module) {
	var $ = require('jquery');
    var page = require('wei/pagetransitions');

    if(whc.launch==1){
        //canvas擦除封面
        var clip = require('wei/clip');
        clip.init(function(){
            //页面滑动初始化
            page.init();
        });
        setTimeout(function(){
            $('.loading').remove();
        },1000);
    }else{
        //页面滑动初始化
        page.init();
    }

    //页面事件
    var $page = $('.page');
    $page.each(function(i, item){
        $(item).on('current',function(){
            //下一页背景预加载
            if($page.eq(i+1).length && !!$page.eq(i+1).data('b')){
                var $nextpage = $page.eq(i+1);
                $nextpage.get(0).style.backgroundImage = 'url('+$nextpage.data('b')+')';
                $nextpage.data('b',0);
            }
            //here you go


        })
    })

    //幻灯片初始化
    require("wei/flyingCarousel");
    var flyPages = $(".page-flying");
    flyPages.each(function (i, item) {
        var fpage = $(item);
        var flycar = fpage.find(".flying-items").flyingCarousel();
        /*fpage.on("active", function () {
            flycar.removeClass("z-viewArea").find("li.p-current").removeClass("p-current");
        }).on("current", function () {
            flycar.addClass("z-viewArea");
            setTimeout(function () {
                flycar.find("li:first").addClass("p-current");
            }, 1800);
        })*/
    });

    //初始化视频组件
    var youku = require('wei/video/youku');
    youku.init();

    //初始化音乐组件
    if(whc.bgMusic==1){
        var g_audio = $(".ui-music audio").get(0), isPlay = false;
        $('body').on('touchstart', function (e) {
            if(!isPlay){
                g_audio.src = $(g_audio).attr('data-src');
                g_audio.play();
                isPlay = true;
                $('.ui-music').addClass('playing');
                $(g_audio).attr('data-play',1);
            }
        });
        $('.ui-music').on("click", function (e) {
            e.preventDefault();
            if($(g_audio).attr('data-play')==1){
                g_audio.pause();
                $(g_audio).attr('data-play',0);
                $('.ui-music').removeClass('playing');
            }else{
                g_audio.play();
                $(g_audio).attr('data-play',1);
                $('.ui-music').addClass('playing');
            }
        });
    };
    //微信分享注册
    require('wei/wechat/share');
    //输出jquery
    module.exports = $;
});