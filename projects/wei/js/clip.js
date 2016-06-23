/**
 * 开场效果
 */
define(function (require, exports, module) {
    var $ = require('jquery');
    var canvas,ctx;
    var x1, y1, a = 30, timeout, totimes = 100, betsize = 10;

    exports.init = function(cb){
        switch(whc.launchType){
            case 101:
                showType101(cb);//开门
                break;
            case 102:
                showType102(cb);//唇印
            default:
                showType100(cb);//擦除
        }
    };

    //擦除
    function showType100(cb){
        canvas = document.getElementById("clip-canvas");
        ctx = canvas.getContext("2d");

        canvas.width = $('body').width();
        canvas.height = $('body').height();

        var img = new Image();
        img.src = $(canvas).data('src');
        img.onload = function () {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            tapClip(cb);
        };
    }

    //开门
    function showType101(cb){
        var container = $('.cover-container');
        container.on('touchstart',function(event){

            var img = container.data('src');
            var wrap = '<div class="cover-slice-v" style="background-image: url('+img+');"></div>';
            container.html(wrap+wrap);
            container.css('background-image','');

            var animEndEventNames = {
                'WebkitTransition': 'webkitTransitionEnd',
                'MozTransition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'msTransition': 'MSTransitionEnd',
                'transition': 'transitionend'
            };
            var animEndEventName = animEndEventNames[ Modernizr.prefixed('transition') ];

            setTimeout(function(){

                if(Modernizr.cssanimations){
                    container.addClass('opendoor').on(animEndEventName,function(){
                        container.remove();
                        //console.log(animEndEventName);
                    });
                }else{
                    container.addClass('opendoor');
                    setTimeout(function(){
                        container.remove();
                        //console.log('remove by timer');
                    },1000);
                }
                cb();
            },50);
        });
    }

    //唇印
    function showType102(cb){
        console.log(102)
        $('.cover-container').on(Modernizr.touch?'touchstart':'mousedown',function(event){
            if(Modernizr.touch && event.touches.length>=2 || !Modernizr.touch){//多点触摸

                var x= 0,y=0;
                if(Modernizr.touch){
                    x = event.touches[0].pageX-150;
                    y = event.touches[0].pageY-150;
                }else{
                    x = event.pageX-150;
                    y = event.pageY-150;
                }

                $('.kiss').css('top',y).css('left',x);

                setTimeout(function(){
                    var animEndEventNames = {
                        'WebkitAnimation' : 'webkitAnimationEnd',
                        'OAnimation' : 'oAnimationEnd',
                        'msAnimation' : 'MSAnimationEnd',
                        'animation' : 'animationend'
                    };

                    var animEndEventName = animEndEventNames[Modernizr.prefixed('animation')];

                    $('.cover-container').addClass('animated fadeOut').one(animEndEventName,function(){
                        $('.cover-container').remove();
                    });

                    cb();
                },1000);
            }
        });
    }

    //通过修改globalCompositeOperation来达到擦除的效果
    function tapClip(cb) {
        var hastouch = "ontouchstart" in window ? true : false,
            tapstart = hastouch ? "touchstart" : "mousedown",
            tapmove = hastouch ? "touchmove" : "mousemove",
            tapend = hastouch ? "touchend" : "mouseup";

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = a * 2;
        ctx.globalCompositeOperation = "destination-out";

        canvas.addEventListener(tapstart, function (e) {
            clearTimeout(timeout)
            e.preventDefault();

            x1 = hastouch ? e.targetTouches[0].pageX : e.clientX - canvas.offsetLeft;
            y1 = hastouch ? e.targetTouches[0].pageY : e.clientY - canvas.offsetTop;

            ctx.save();
            ctx.beginPath()
            ctx.arc(x1, y1, 1, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();

            canvas.addEventListener(tapmove, tapmoveHandler);
            canvas.addEventListener(tapend, function () {
                canvas.removeEventListener(tapmove, tapmoveHandler);

                timeout = setTimeout(function () {
                    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    var dd = 0;
                    for (var x = 0; x < imgData.width; x += betsize) {
                        for (var y = 0; y < imgData.height; y += betsize) {
                            var i = (y * imgData.width + x) * 4;
                            if (imgData.data[i + 3] > 0) {
                                dd++
                            }
                        }
                    }
                    if (dd / (imgData.width * imgData.height / (betsize * betsize)) < 0.4) {
                        canvas.className = "cover-clear";

                        setTimeout(function(){
                            $('.cover-container').hide();
                        },1000);

                        if($.isFunction(cb)){
                            cb();
                        }
                    }
                }, totimes)
            });
            function tapmoveHandler(e) {
                clearTimeout(timeout)
                e.preventDefault()
                x2 = hastouch ? e.targetTouches[0].pageX : e.clientX - canvas.offsetLeft;
                y2 = hastouch ? e.targetTouches[0].pageY : e.clientY - canvas.offsetTop;

                ctx.save();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
                ctx.restore()

                x1 = x2;
                y1 = y2;
            }
        })
    }
});
