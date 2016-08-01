require('transit');
var Circle = {
	time : 0,
    lTime : ${lt.value}, //半圈时间
    flag : false,
    init : function (target,num1,maxNum1) {
        $('.circle-s .circle-out').addClass('unrotated');
        $(target).show().addClass('transitiond bounceIn');
        var that =this;
        setTimeout(function(){
            that.count(target,num1,maxNum1);  
        },400);

        that.bind();
    },
    count : function(item,num,maxNum){
        var i = 0,
        deg = Math.ceil(num/maxNum*360),
        lTime = this.lTime,
        time =  lTime*2*num/maxNum,
        speed = time/(num*10);
        $(item).data('time',+time);

        //计算运动时间
        if(deg<180){
            lTime = time;
        }
        var that =this;
        
        that.circle(item,deg,lTime);

        var count = setInterval(function() {
            $(item).find('.integer-num').text((i/10).toFixed(1).split('.')[0]);
            $(item).find('.decimal-num').text((i/10).toFixed(1).split('.')[1]);
            if(i>=num*10){
                clearInterval(count);
            }
            i++;
        }, speed);
    },
    circle : function (item,d,lt){
        var l = $(item).find('.circle-range-left'),
        r = $(item).find('.circle-range-right');  
        d = d > 360 ? 360 : d;
        d = d < 0   ? 0   : d;
        lt = lt ? lt  : 400;
        var that = this;

        l.css('opacity','1');

        if(d < 180){
            l.transition({
                    rotate: d+'deg'
                },$(item).data('time'),'linear',function(){
                if(that.flag){
                    that.circle2($('.circle-s .circle-out.unrotated'));
                }
            });   
        }else{
            l.transition({
                    rotate: '180deg'
                },lt,'linear',function(){
                    r.css('opacity','1');
                    r.transition({
                        rotate: (d-180) +'deg'  
                    }, $(item).data('time') - lt, 'linear',function(){
                        if(that.flag){
                            that.circle2($('.circle-s .circle-out.unrotated'));
                        }
                    });
            });
        }
        
    },
    //页面滑到当前位置才做动画
    circle2 : function(item){
        $(item).each(function(){
            if($(this).offset().top > $(window).height() + $(window).scrollTop() - 60) {
                return;
            }else{
                var l = $(this).find('.circle-range-left'),
                r = $(this).find('.circle-range-right');
                var that = this;
                l.css('opacity', '1');
                l.transition({
                        rotate: '180deg'
                    },500,'linear',function(){
                        r.css('opacity','1');
                        r.transition({
                            rotate: '180deg'  
                        }, 500, 'linear',function(){
                            $(that).find('.icon-ok').addClass('transitiond bounceInUp').show();
                        });
                });
                $(that).removeClass('unrotated');
            }
        });
        
    },
    bind : function(){
        var that = this;
        $(window).scroll(function(){
            if($('.circle-s .circle-out.unrotated').length){
                that.circle2($('.circle-s .circle-out.unrotated'));
            }
        });
    }
};

Circle.init('#${id}',${start.value},${end.value});