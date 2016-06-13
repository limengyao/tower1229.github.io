/*
* version: v0.1.0
* update: 微画册第一页有图则加载完再显示
* date: 2015-09-02
*/
define(function(require, exports, module) {
    var $ = require('jquery');
    require('touch');
    var $pages = $('.page-container .page'),
        pagesCount = $pages.length,
        current = 0,
        isAnimating = false,
        endCurrPage = false,
        endNextPage = false,
        animEndEventNames = {
            'WebkitAnimation': 'webkitAnimationEnd',
            'OAnimation': 'oAnimationEnd',
            'msAnimation': 'MSAnimationEnd',
            'animation': 'animationend'
        },
        animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],
        support = Modernizr.cssanimations;

    function initDefaultEvent() {
        var body = $('body');
        var win = $(window);
        var currentPage = null; //当前页
        var disablePageTouchMove = false;

        var activePage = null, //激活页
            startX = 0,
            startY = 0,
            moveDistanceX = 0,
            moveDistanceY = 0,
            triggerLoop = false,
            isStart = false,
            isNext = false,
            isFirstTime = true;

        //页面之间的切换事件
        //禁止画布跟随滚动
        win.on("scroll.elasticity", function(e) {
            e.preventDefault()
        }).on("move.elasticity", function(e) {
            e.preventDefault()
        });
        win.delegate("img", "mousemove", function(e) {
            e.preventDefault()
        });

        body.on('mousedown movestart', function(e) {
            if (disablePageTouchMove) {
                return;
            }

            currentPage = $pages.filter('.p-current').get(0);
            activePage = null;
            if (currentPage) {
                isStart = true;
                isNext = false;
                isFirstTime = true;
                moveDistanceX = 0;
                moveDistanceY = 0;
            }

            startX = e.pageX;
            startY = e.pageY;
            currentPage.classList.add("moving");
            currentPage.style.webkitTransition = "none";
        }).on('mousemove move', function(e) {
            if (!(isStart && (activePage || isFirstTime))) {
                return;
            }
            //debugger;
            moveDistanceX = e.pageX - startX;
            moveDistanceY = e.pageY - startY;

            if (Math.abs(moveDistanceY) > Math.abs(moveDistanceX)) { //竖着滚动位移大于横向滚动
                if (moveDistanceY > 0) { //往上滑动
                    if (isNext || isFirstTime) {
                        isNext = !1;
                        isFirstTime = !1;
                        if (activePage) {
                            activePage.classList.remove("p-active");
                            activePage.classList.remove("moving");
                        } else {
                            activePage = currentPage.previousElementSibling && currentPage.previousElementSibling.classList.contains("page") ? currentPage.previousElementSibling : triggerLoop ? $pages.last().get(0) : !1;
                        }

                        if (activePage && activePage.classList.contains("page")) {
                            activePage.classList.add("p-active");
                            activePage.classList.add("moving");
                            activePage.style.webkitTransition = "none";
                            activePage.style.webkitTransform = "translate3d(0,-100%,0)";
                            $(activePage).trigger("active");
                            currentPage.style.webkitTransformOrigin = "bottom center";
                        } else {
                            currentPage.style.webkitTransform = "translate3d(0,0px,0) scale3d(1,1,1)";
                            activePage = null;
                        }
                    } else {
                        currentPage.style.webkitTransform = "scale3d(" + (window.innerHeight / (window.innerHeight + moveDistanceY)).toFixed(3) + ',' + (window.innerHeight / (window.innerHeight + moveDistanceY)).toFixed(3) + ',' + (window.innerHeight / (window.innerHeight + moveDistanceY)).toFixed(3) + ")";
                        if (activePage) {
                            activePage.style.webkitTransform = "translate3d(0,-" + (window.innerHeight - moveDistanceY) + "px,0)";
                        }

                    }
                } else if (moveDistanceY < 0) { //往下滑动
                    if (!isNext || isFirstTime) {
                        isNext = true;
                        isFirstTime = false;
                        if (activePage) {
                            activePage.classList.remove("p-active");
                            activePage.classList.remove("moving");
                        } else {
                            if (currentPage.nextElementSibling && currentPage.nextElementSibling.classList.contains("page")) {
                                activePage = currentPage.nextElementSibling;
                            } else {
                                activePage = $pages.first().get(0);
                                triggerLoop = true;
                            }
                        }

                        if (activePage && activePage.classList.contains("page")) {
                            activePage.classList.add("p-active");
                            activePage.classList.add("moving");
                            activePage.style.webkitTransition = "none";
                            activePage.style.webkitTransform = "translate3d(0," + window.innerHeight + "px,0)";
                            $(activePage).trigger("active");
                            currentPage.style.webkitTransformOrigin = "top center";
                        } else {
                            currentPage.style.webkitTransform = "translate3d(0,0px,0) scale(1)";
                            activePage = null;
                        }
                    } else {
                        currentPage.style.webkitTransform = "scale3d(" + ((window.innerHeight + moveDistanceY) / window.innerHeight).toFixed(3) + ',' + ((window.innerHeight + moveDistanceY) / window.innerHeight).toFixed(3) + ',' + ((window.innerHeight + moveDistanceY) / window.innerHeight).toFixed(3) + ")";
                        activePage.style.webkitTransform = "translate3d(0," + (window.innerHeight + moveDistanceY) + "px,0)";
                    }
                }
            }
        }).on('mouseup moveend', function(e) {
            if (!isStart) {
                return;
            }
            isStart = false;

            if (activePage) {
                disablePageTouchMove = true;
                currentPage.style.webkitTransition = "-webkit-transform 0.4s ease-out";
                activePage.style.webkitTransition = "-webkit-transform 0.4s ease-out";
                if (Math.abs(moveDistanceY) > Math.abs(moveDistanceX) && Math.abs(moveDistanceY) > 100) {
                    if (isNext) {
                        currentPage.style.webkitTransform = "scale3d(0.2,0.2,0.2)";
                        activePage.style.webkitTransform = "translate3d(0,0px,0)";
                    } else {
                        currentPage.style.webkitTransform = "scale3d(0.2,0.2,0.2)";
                        activePage.style.webkitTransform = "translate3d(0,0px,0)";
                    }
                    setTimeout(function() {
                        if (activePage) {
                            activePage.classList.remove("p-active");
                            activePage.classList.remove("moving");
                            activePage.classList.add("p-current");
                        }

                        currentPage.classList.remove("p-current");
                        currentPage.classList.remove("moving");
                        currentPage = $(activePage).trigger("current").get(0);
                        $(currentPage).trigger("hide");
                        disablePageTouchMove = false;
                    }, 400);
                } else {
                    if (isNext) {
                        currentPage.style.webkitTransform = "scale3d(1,1,1)";
                        activePage.style.webkitTransform = "translate3d(0,100%,0)";
                    } else {
                        currentPage.style.webkitTransform = "scale3d(1,1,1)";
                        activePage.style.webkitTransform = "translate3d(0,-100%,0)";
                    }

                    setTimeout(function() {
                        activePage.classList.remove("p-active");
                        activePage.classList.remove("moving");
                        disablePageTouchMove = false;
                    }, 500);
                }
            } else {
                currentPage.classList.remove("moving");
            }
        });
    }

    function initCustomEvent(animcursor) {
        var body = $('body');
        var win = $(window);

        var startX = 0,
            startY = 0,
            moveDistanceX = 0,
            moveDistanceY = 0,
            isNext = false,
            isFirstTime = true;

        $pages.each(function() {
            var $page = $(this);
            $page.data('originalClassList', $page.attr('class').replace('p-current', ''));
        });

        //$pages.eq(current).addClass('p-current');

        //页面之间的切换事件

        //禁止画布跟随滚动
        win.on("scroll.elasticity", function(e) {
            e.preventDefault()
        }).on("move.elasticity", function(e) {
            e.preventDefault()
        });
        win.delegate("img", "mousemove", function(e) {
            e.preventDefault()
        });
        body.on(Modernizr.touch ? 'movestart' : 'mousedown', function(e) {
            currentPage = $pages.filter('.p-current');
            if(currentPage.attr('pageSwitch')){
                animcursor = +currentPage.attr('pageSwitch');
            }
            if (currentPage.get(0)) {
                isNext = false;
                isFirstTime = true;
                moveDistanceX = 0;
                moveDistanceY = 0;
            }

            startX = e.pageX;
            startY = e.pageY;

        }).on(Modernizr.touch ? 'move' : 'mousemove', function(e) {
            moveDistanceX = e.pageX - startX;
            moveDistanceY = e.pageY - startY;

            if (Math.abs(moveDistanceY) > Math.abs(moveDistanceX)) { //竖着滚动位移大于横向滚动
                if (moveDistanceY > 0) { //往上滑动
                    
                    if (isNext || isFirstTime) {
                        isNext = false;
                        isFirstTime = false;
                    }
                } else if (moveDistanceY < 0) { //往下滚动
                    
                    if (!isNext || isFirstTime) {
                        isNext = true;
                        isFirstTime = false;
                    }
                }
            }
        }).on(Modernizr.touch ? 'moveend' : 'mouseup', function(e) {
            if (Math.abs(moveDistanceY) > Math.abs(moveDistanceX) && Math.abs(moveDistanceY) > 100) { //up
                if (isNext) {
                    turnPage(animcursor, 1);
                } else {
                    turnPage(animcursor - 0 + 1, -1);
                }
            } else { //down

            }
        });
    }

    module.exports = {
        "init":function() {
            if($pages.length && !!$pages.eq(0).data('b')){
                $pages.get(0).style.backgroundImage = 'url('+$pages.eq(0).data('b')+')';
                $pages.eq(0).data('b',0);
            }
            if($pages.length>1){
                if (whc.pageSwitch == 0) {
                    initDefaultEvent();
                } else {
                    initCustomEvent(whc.pageSwitch);
                }
            }
            if($pages.eq(0).find('img').length){
                require.async('img-loaded',function(){
                    $pages.eq(0).imagesLoaded(function(){
                        $('.loading').remove();
                    });
                });
            }else{
                $('.loading').remove();
            }
            setTimeout(function(){
                $pages.each(function(i,e){
                    if(!i){
                        $(e).addClass('p-current').trigger('current');
                    }else{
                        var $eachPage = $(e);
                        setTimeout(function(){
                            if(!!$eachPage.data('b')){
                                $eachPage.get(0).style.backgroundImage = 'url('+$eachPage.data('b')+')';
                                $eachPage.data('b',0);
                            }
                        },i*1e3);
                    }
                })
            },0);
        },
        "disableFlipPage":function() {
            disablePageTouchMove = true;
        },
        "enableFlipPage":function() {
            disablePageTouchMove = false;
        }
    }

    function turnPage(animation, lap) {
        if (isAnimating) {
            return false;
        }
        isAnimating = true;
        var $currPage = $pages.eq(current);
        current += lap;

        if (current >= pagesCount) {
            current = 0;
        } else if (current < 0) {
            current = pagesCount - 1;
        }
        
        var $nextPage = $pages.eq(current).addClass('p-active').trigger('current'),
            classes = getInOutClass(animation),
            outClass = classes[1],
            inClass = classes[0];

        //debugger;
        $currPage.on(animEndEventName, function() {
            $currPage.off(animEndEventName);
            endCurrPage = true;
            if (endNextPage) {
                onEndAnimation($currPage, $nextPage);
            }
        });
        $currPage.addClass(outClass);

        $nextPage.on(animEndEventName, function() {
            $nextPage.off(animEndEventName);
            endNextPage = true;
            if (endCurrPage) {
                onEndAnimation($currPage, $nextPage);
            }
        });
        $nextPage.addClass(inClass);

        if ($nextPage.data('originalClassList').indexOf('page-flying') > -1) {
            $nextPage.find('.flying-items').removeClass('z-viewArea');
        }

        if (!support) {
            onEndAnimation($currPage, $nextPage);
        }

    }

    function onEndAnimation($outpage, $inpage) {
        endCurrPage = false;
        endNextPage = false;
        resetPage($outpage, $inpage);
        isAnimating = false;
    }

    function resetPage($outpage, $inpage) {
        //debugger;
        $pages.removeClass('p-current');
        $outpage.attr('class', $outpage.data('originalClassList'));
        $inpage.attr('class', $inpage.data('originalClassList') + ' p-current');

        //debugger;
        if ($inpage.data('originalClassList').indexOf('page-flying') > -1) {
            $inpage.find('.flying-items').addClass('z-viewArea');
        }
    }

    function getInOutClass(animation) {

        switch (animation) {
            case 1:
                outClass = 'pt-page-moveToLeft';
                inClass = 'pt-page-moveFromRight';
                break;
            case 2:
                outClass = 'pt-page-moveToRight';
                inClass = 'pt-page-moveFromLeft';
                break;
            case 3:
                outClass = 'pt-page-moveToTop';
                inClass = 'pt-page-moveFromBottom';
                break;
            case 4:
                outClass = 'pt-page-moveToBottom';
                inClass = 'pt-page-moveFromTop';
                break;
            case 5:
                outClass = 'pt-page-fade';
                inClass = 'pt-page-moveFromRight pt-page-ontop';
                break;
            case 6:
                outClass = 'pt-page-fade';
                inClass = 'pt-page-moveFromLeft pt-page-ontop';
                break;
            case 7:
                outClass = 'pt-page-fade';
                inClass = 'pt-page-moveFromBottom pt-page-ontop';
                break;
            case 8:
                outClass = 'pt-page-fade';
                inClass = 'pt-page-moveFromTop pt-page-ontop';
                break;
            case 9:
                outClass = 'pt-page-moveToLeftFade';
                inClass = 'pt-page-moveFromRightFade';
                break;
            case 10:
                outClass = 'pt-page-moveToRightFade';
                inClass = 'pt-page-moveFromLeftFade';
                break;
            case 11:
                outClass = 'pt-page-moveToTopFade';
                inClass = 'pt-page-moveFromBottomFade';
                break;
            case 12:
                outClass = 'pt-page-moveToBottomFade';
                inClass = 'pt-page-moveFromTopFade';
                break;
            case 13:
                outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
                inClass = 'pt-page-moveFromRight';
                break;
            case 14:
                outClass = 'pt-page-moveToRightEasing pt-page-ontop';
                inClass = 'pt-page-moveFromLeft';
                break;
            case 15:
                outClass = 'pt-page-moveToTopEasing pt-page-ontop';
                inClass = 'pt-page-moveFromBottom';
                break;
            case 16:
                outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
                inClass = 'pt-page-moveFromTop';
                break;
            case 17:
                outClass = 'pt-page-scaleDown';
                inClass = 'pt-page-moveFromRight pt-page-ontop';
                break;
            case 18:
                outClass = 'pt-page-scaleDown';
                inClass = 'pt-page-moveFromLeft pt-page-ontop';
                break;
            case 19:
                outClass = 'pt-page-scaleDown';
                inClass = 'pt-page-moveFromBottom pt-page-ontop';
                break;
            case 20:
                outClass = 'pt-page-scaleDown';
                inClass = 'pt-page-moveFromTop pt-page-ontop';
                break;
            case 21:
                outClass = 'pt-page-scaleDown';
                inClass = 'pt-page-scaleUpDown pt-page-delay300';
                break;
            case 22:
                outClass = 'pt-page-scaleDownUp';
                inClass = 'pt-page-scaleUp pt-page-delay300';
                break;
            case 23:
                outClass = 'pt-page-moveToLeft pt-page-ontop';
                inClass = 'pt-page-scaleUp';
                break;
            case 24:
                outClass = 'pt-page-moveToRight pt-page-ontop';
                inClass = 'pt-page-scaleUp';
                break;
            case 25:
                outClass = 'pt-page-moveToTop pt-page-ontop';
                inClass = 'pt-page-scaleUp';
                break;
            case 26:
                outClass = 'pt-page-moveToBottom pt-page-ontop';
                inClass = 'pt-page-scaleUp';
                break;
            case 27:
                outClass = 'pt-page-scaleDownCenter';
                inClass = 'pt-page-scaleUpCenter pt-page-delay400';
                break;
            case 28:
                outClass = 'pt-page-rotateRightSideFirst';
                inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
                break;
            case 29:
                outClass = 'pt-page-rotateLeftSideFirst';
                inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
                break;
            case 30:
                outClass = 'pt-page-rotateTopSideFirst';
                inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
                break;
            case 31:
                outClass = 'pt-page-rotateBottomSideFirst';
                inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
                break;
            case 32:
                outClass = 'pt-page-flipOutRight';
                inClass = 'pt-page-flipInLeft pt-page-delay500';
                break;
            case 33:
                outClass = 'pt-page-flipOutLeft';
                inClass = 'pt-page-flipInRight pt-page-delay500';
                break;
            case 34:
                outClass = 'pt-page-flipOutTop';
                inClass = 'pt-page-flipInBottom pt-page-delay500';
                break;
            case 35:
                outClass = 'pt-page-flipOutBottom';
                inClass = 'pt-page-flipInTop pt-page-delay500';
                break;
            case 36:
                outClass = 'pt-page-rotateFall pt-page-ontop';
                inClass = 'pt-page-scaleUp';
                break;
            case 37:
                outClass = 'pt-page-rotateOutNewspaper';
                inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
                break;
            case 38:
                outClass = 'pt-page-rotatePushLeft';
                inClass = 'pt-page-moveFromRight';
                break;
            case 39:
                outClass = 'pt-page-rotatePushRight';
                inClass = 'pt-page-moveFromLeft';
                break;
            case 40:
                outClass = 'pt-page-rotatePushTop';
                inClass = 'pt-page-moveFromBottom';
                break;
            case 41:
                outClass = 'pt-page-rotatePushBottom';
                inClass = 'pt-page-moveFromTop';
                break;
            case 42:
                outClass = 'pt-page-rotatePushLeft';
                inClass = 'pt-page-rotatePullRight pt-page-delay180';
                break;
            case 43:
                outClass = 'pt-page-rotatePushRight';
                inClass = 'pt-page-rotatePullLeft pt-page-delay180';
                break;
            case 44:
                outClass = 'pt-page-rotatePushTop';
                inClass = 'pt-page-rotatePullBottom pt-page-delay180';
                break;
            case 45:
                outClass = 'pt-page-rotatePushBottom';
                inClass = 'pt-page-rotatePullTop pt-page-delay180';
                break;
            case 46:
                outClass = 'pt-page-rotateFoldLeft';
                inClass = 'pt-page-moveFromRightFade';
                break;
            case 47:
                outClass = 'pt-page-rotateFoldRight';
                inClass = 'pt-page-moveFromLeftFade';
                break;
            case 48:
                outClass = 'pt-page-rotateFoldTop';
                inClass = 'pt-page-moveFromBottomFade';
                break;
            case 49:
                outClass = 'pt-page-rotateFoldBottom';
                inClass = 'pt-page-moveFromTopFade';
                break;
            case 50:
                outClass = 'pt-page-moveToRightFade';
                inClass = 'pt-page-rotateUnfoldLeft';
                break;
            case 51:
                outClass = 'pt-page-moveToLeftFade';
                inClass = 'pt-page-rotateUnfoldRight';
                break;
            case 52:
                outClass = 'pt-page-moveToBottomFade';
                inClass = 'pt-page-rotateUnfoldTop';
                break;
            case 53:
                outClass = 'pt-page-moveToTopFade';
                inClass = 'pt-page-rotateUnfoldBottom';
                break;
            case 54:
                outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
                inClass = 'pt-page-rotateRoomLeftIn';
                break;
            case 55:
                outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
                inClass = 'pt-page-rotateRoomRightIn';
                break;
            case 56:
                outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
                inClass = 'pt-page-rotateRoomTopIn';
                break;
            case 57:
                outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
                inClass = 'pt-page-rotateRoomBottomIn';
                break;
            case 58:
                outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
                inClass = 'pt-page-rotateCubeLeftIn';
                break;
            case 59:
                outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
                inClass = 'pt-page-rotateCubeRightIn';
                break;
            case 60:
                outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
                inClass = 'pt-page-rotateCubeTopIn';
                break;
            case 61:
                outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
                inClass = 'pt-page-rotateCubeBottomIn';
                break;
            case 62:
                outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
                inClass = 'pt-page-rotateCarouselLeftIn';
                break;
            case 63:
                outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
                inClass = 'pt-page-rotateCarouselRightIn';
                break;
            case 64:
                outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
                inClass = 'pt-page-rotateCarouselTopIn';
                break;
            case 65:
                outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
                inClass = 'pt-page-rotateCarouselBottomIn';
                break;
            case 66:
                outClass = 'pt-page-rotateSidesOut';
                inClass = 'pt-page-rotateSidesIn pt-page-delay200';
                break;
            case 67:
                outClass = 'pt-page-rotateSlideOut';
                inClass = 'pt-page-rotateSlideIn';
                break;

            case 68:
                outClass = 'animated fadeOut';
                inClass = 'animated fadeIn';
                break;

            case 69:
                outClass = 'animated fadeOut';
                inClass = 'animated fadeIn';
                break;

            default:
                outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
                inClass = 'pt-page-rotateCubeBottomIn';
        }
        return [inClass, outClass];
    }

});