define(function (require, exports, module) {
    var $ = require('jquery');
    require('touch');
    !function () {
        var FlyingCarousel = function ($item) {
            var theClass = this;
            this.$target = $item.addClass("flying-items");
            this.$_currentItem = this.$target.find("li").first().addClass("p-current");

            $(window).on("resize", function () {
                theClass.$target.height(window.innerHeight)
            }).trigger("resize");

            this.$target.find(".imgText").each(function (i, item) {
                0 == $.trim(item.innerHTML).length && $(item).remove()
            });

            this.$target.on("ontouchstart" in window ?"swipeleft swiperight":"click", function (e) {
                theClass.$_currentItem.addClass("swipeleft" == e.type ? "z-hideToLeft" : "z-hideToRight")
            }).delegate("li", "webkitAnimationEnd", function () {
                theClass.$target.append(theClass.$_currentItem);
                theClass.$_currentItem.removeClass("p-current z-hideToLeft z-hideToRight");
                theClass.$_currentItem = theClass.$target.find("li").first().addClass("p-current");
            });
        };
        FlyingCarousel.show = function () {
            this.$target.addClass("z-show");
        };
        $.fn.flyingCarousel = function () {
            var command = "init";
            switch (arguments.length > 0 && "string" == typeof arguments[0] && (command = arguments[0]), command) {
                case "init":
                    this.each(function (i, item) {
                        var $item = $(item), pluginObj = new FlyingCarousel($item);
                        $item.data("plugin_flyingCarousel", pluginObj);
                    });
                    break;
                case "getPluginObject":
                    return $item.data("plugin_flyingCarousel");
            }
            return this;
        }
    }();

    module.exports = $;
});