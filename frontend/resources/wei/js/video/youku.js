define(function (require, exports, module) {
    var $ = require('jquery');

    require("wei/plugin/maskLayer");

    var youkuApi = require("wei/video/jsapi"),
    page = require('wei/pagetransitions'),
    $videoPages = $(".page-video");

    !function () {
        var playerIndex = 0, YoukuVideo = function ($item, options) {
            var theClass = this;
            this.$target = $item.addClass("m-youkuVideo"), this.settings = null, this.player = null, this._playerID = "videoBody_" + ++playerIndex;
            var devID = this.$target.data("devid"), videoUrl = this.$target.data("src");
            this.settings = $.extend({devID: devID ? devID : "168eed9e805f5239", url: videoUrl && videoUrl.indexOf("youku") >= 0 ? videoUrl : "http://v.youku.com/v_show/id_XNzU1MTM3MDAw.html", onPlayerReady: function () {
                console.log("event：准备就绪")
            }, onPlayStart: function () {
                console.log("event：播放开始")
            }, onPlayEnd: function () {
                console.log("event：播放结束")
            }}, options), this.$target.attr("id", this._playerID), this.player = new youkuApi.YKU.Player(this._playerID, {styleid: "0", client_id: theClass.settings.devID, vid: theClass._getVidByUrl(theClass.settings.url), show_related: !1, autoplay: !0, events: {onPlayerReady: theClass.settings.onPlayerReady, onPlayStart: function (e) {
                theClass._isPlayStart = !0, theClass.settings.onPlayStart(e)
            }, onPlayEnd: theClass.settings.onPlayEnd}}), this._isPlayStart = !1, this.$target.on("click", function () {
                theClass._isPlayStart || setTimeout(function () {
                    theClass.play()
                }, 200)
            })
        };
        YoukuVideo.prototype._getVidByUrl = function (url) {
            var vid = url ? vid = url.substring(url.indexOf("/id_") + 4, url.indexOf(".html")) : "";
            return vid || console.log("error：视频地址不正确！"), vid
        }, YoukuVideo.prototype.play = function () {
            try {
                this.player.playVideo()
            } catch (e) {
                console.log(e)
            }
        }, YoukuVideo.prototype.pause = function () {
            try {
                this.player.pauseVideo()
            } catch (e) {
                console.log(e)
            }
        }, YoukuVideo.prototype.destroy = function () {
            this.$target.html("").data("plugin_video", null), delete this.player
        }, $.fn.youkuVideo = function (options) {
            var command = "init";
            switch (arguments.length > 0 && "string" == typeof arguments[0] && (command = arguments[0]), command) {
                case"init":
                    this.each(function (i, item) {
                        var $item = $(item), pluginObj = new YoukuVideo($item, options);
                        $item.data("plugin_video", pluginObj)
                    });
                    break;
                case"getPluginObject":
                    return this.data("plugin_video")
            }
            return this
        }
    }();
    //module.exports = $;

    module.exports = {
        init: function () {
            $videoPages.each(function (i, item) {
                var youkuVideo;
                var g_audio = $(".ui-music audio").get(0);
                var $page = $(item);
                var $btnPlay = $page.find(".m-btnPlay");
                var $youkuVideo = $page.find(".m-youkuVideo");
                var playState = "playing";
                youkuVideoLayer = $page.find(".m-youkuVideoLayer").maskLayer({onShow: function () {
                    $btnPlay.hide();
                    page.disableFlipPage();
                    if(whc.bgMusic==1){
                        g_audio.pause();
                        $(g_audio).attr('data-play',0);
                        $('.ui-music').removeClass('playing');
                    }
                    youkuVideo = $youkuVideo.youkuVideo().youkuVideo("getPluginObject");
                }, onHide: function () {
                    $btnPlay.show();
                    page.enableFlipPage();
                    if(whc.bgMusic==1){
                        g_audio.play();
                        $(g_audio).attr('data-play',1);
                        $('.ui-music').addClass('playing');
                    }

                    youkuVideo.destroy();
                }}).maskLayer("getPluginObject");

                $btnPlay.on("click", function () {
                    youkuVideoLayer.show()
                }), $page.on("active", function () {
                    //console.log("video active")
                }).on("current", function () {
                    //console.log("video current")
                })
            })
    }};
});