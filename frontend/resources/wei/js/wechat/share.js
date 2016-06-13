define(function (require, exports, module) {
    var $ = require('jquery');
    var page = require('wei/pagetransitions');
    (function(){

        $('.p-wechat-pop').on('click',function(){
            $('.pop-wechat').show();
            page.disableFlipPage();
        });

        $('.pop-wechat a').on('click',function(){
            $('.pop-wechat').hide();
            page.enableFlipPage();
        });


        if(whc.shareTitle.length==0){
            return;
        }
        var onBridgeReady = function () {
            WeixinJSBridge.call("hideToolbar");

            var link   = location.href,
                title  = whc.shareTitle,
                desc   = whc.shareDesc,
                imgUrl = whc.shareImage;

            // 发送给好友;
            WeixinJSBridge.on('menu:share:appmessage', function(argv){
                WeixinJSBridge.invoke('sendAppMessage',{
                    "img_url"    : imgUrl,
                    "link"       : link,
                    "desc"       : desc,
                    "title"      : title
                },function(res){});
            });

            // 分享到朋友圈;
            WeixinJSBridge.on('menu:share:timeline', function(argv){
                WeixinJSBridge.invoke('shareTimeline',{
                    "img_url"    : imgUrl,
                    "link"       : link,
                    "desc"       : desc,
                    "title"      : title
                }, function(res){});
            });

            // 分享到微博;
            var weiboContent = '';
            WeixinJSBridge.on('menu:share:weibo', function(argv){
                WeixinJSBridge.invoke('shareWeibo',{
                        "content" : title + link,
                        "url"     : link
                    },
                    function(res){});
            });
        };

        if(document.addEventListener){
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if(document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady'   , onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady' , onBridgeReady);
        }
    })();
});