/* jQuery Carousel 0.9.8Copyright 2010 Thomas Lanciaux and Pierre Bertet.This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/> */(function(g) {    g.fn.carousel = function(q) {        var q = g.extend({            direction:"horizontal"            ,loop:false            ,dispItems:1            ,pagination:false            ,paginationPosition:"inside"            ,nextBtn:'<a href="#">Next</a>'            ,prevBtn:'<a href="#">Previous</a>'            ,btnsPosition:"inside"            ,nextBtnInsert:"insertAfter"            ,prevBtnInsert:"insertAfter"            ,nextBtnInsertFn:false            ,prevBtnInsertFn:false            ,autoSlide:false            ,autoSlideInterval:3000            ,delayAutoSlide:false            ,combinedClasses:false            ,effect:"slide"            ,slideEasing:"swing"            ,animSpeed:300            ,equalWidths:"true"            ,verticalMargin:0            ,callback:function() {}            ,useAddress:false            ,adressIdentifier:"carousel"            ,tabLabel:function(r) {                return r            }            ,showEmptyItems:true            ,ajaxMode:false            ,ajaxUrl:""            ,stopSlideBtn:false            ,stopSlideTextPause:"Pause"            ,stopSlideTextPlay:"Play"        }        ,q);        if(q.btnsPosition == "outside") {            q.prevBtnInsert = "insertAfter";            q.nextBtnInsert = "insertAfter"			//document.getElementById('asHTML').innerHTML = "<div>" + q + "</div>";			//g(document)        }        q.delayAutoSlide = 0 + q.delayAutoSlide;        return this.each(function() {            var r =  {                $elts: {}                ,params:q                ,launchOnLoad:[]            };            r.$elts.carousel = g(this).addClass("js");            r.$elts.content = g(this).children().css({                position:"absolute"                ,top:0            });            r.$elts.wrap = r.$elts.content.wrap('<div class="carousel-wrap"></div>').parent().css({                overflow:"hidden"                ,position:"relative"            });            r.steps =  {                first:0                ,count:r.$elts.content.children().length            };            r.$elts.loader = g('<div class="loader"></div>').css({                position:"absolute"            });            r.steps.last = r.steps.count - 1;            if(r.params.pagination) {                o(r)            }            if(g.isFunction(r.params.prevBtnInsertFn)) {                r.$elts.prevBtn = r.params.prevBtnInsertFn(r.$elts)            } else {                if(q.btnsPosition == "outside") {                    r.$elts.prevBtn = g(q.prevBtn)[q.prevBtnInsert](r.$elts.carousel)                } else {                    r.$elts.prevBtn = g(q.prevBtn)[q.prevBtnInsert](r.$elts.wrap)                }            }            if(g.isFunction(r.params.nextBtnInsertFn)) {                r.$elts.nextBtn = r.params.nextBtnInsertFn(r.$elts)            } else {                if(q.btnsPosition == "outside") {                    r.$elts.nextBtn = g(q.nextBtn)[q.nextBtnInsert](r.$elts.carousel)                } else {                    r.$elts.nextBtn = g(q.nextBtn)[q.nextBtnInsert](r.$elts.wrap)                }            }            r.$elts.nextBtn.addClass("jquery-carousel-right effect");            r.$elts.prevBtn.addClass("jquery-carousel-left effect");            r.lastItemsToLoad;            d(r);            r.$elts.carousel.attr("tabindex",0).add(r.$elts.carousel.children()).bind({                focus:function(s) {                    g(document).bind("keypress",function(t) {                        switch(t.keyCode) {                            case 39:r.$elts.nextBtn.click();                            break;                            case 37:r.$elts.prevBtn.click();                            break                        }                        switch(t.charCode) {                            case 110:r.$elts.nextBtn.click();                            break;                            case 112:r.$elts.prevBtn.click();                            break                        }                    })                }                ,blur:function() {                    g(document).unbind("keypress")                }            });            n(r);            g(function() {                c(r);                g.each(r.launchOnLoad,function(s,t) {                    t()                });                if(r.params.autoSlide) {                    f(r)                }                if(q.stopSlideBtn == true) {                    r.$elts.stopSlideBtn = g('<button type="button" class="slide-control play">' + q.stopSlideTextPause + "</button>");                    a(r)                }            })        })    };    function c(s) {        var t = s.$elts.content.children();        var r = 0;        t.each(function() {            $item = g(this);            $itemHeight = $item.outerHeight();            if($itemHeight > r) {                r = $itemHeight            }        });        if(s.params.verticalMargin > 0) {            r = r + s.params.verticalMargin        }        t.height(r);        var q = s.$elts.content.children(":first");        s.itemWidth = q.outerWidth();        if(s.params.direction == "vertical") {            s.contentWidth = s.itemWidth        } else {            if(s.params.equalWidths) {                s.contentWidth = s.itemWidth * s.steps.count            } else {                s.contentWidth = (function() {                    var u = 0;                    s.$elts.content.children().each(function() {                        u += g(this).outerWidth()                    });                    return u                })()            }        }        s.$elts.content.width(s.contentWidth);        s.itemHeight = r;        if(s.params.direction == "vertical") {            s.$elts.content.css({                height:s.itemHeight * s.steps.count + "px"            });            s.$elts.content.parent().css({                height:s.itemHeight * s.params.dispItems + "px"            })        } else {            s.$elts.content.parent().css({                height:s.itemHeight + "px"            })        }        i(s)    }    function d(q) {        q.$elts.nextBtn.add(q.$elts.prevBtn).bind("enable",function() {            var r = g(this).unbind("click").bind("click",function() {                if(q.params.ajaxMode && r.is(".next") && b(q) == (p(q) - 1) &&  ! q.lastItemsToLoad) {                    h(q);                    q.$elts.content.ajaxSuccess(function() {})                } else {                    e(q,j(q,(r.is(".next")?"next":"prev")));                    if(q.params.stopSlideBtn == true) {                        q.$elts.stopSlideBtn.trigger("pause")                    } else {                        m(q)                    }                }            }).removeClass("disabled").removeAttr("disabled");            if(q.params.combinedClasses) {                r.removeClass("next-disabled previous-disabled").removeAttr("disabled")            }        }).bind("disable",function() {            var r = g(this).unbind("click").addClass("disabled").attr("disabled","disabled");            if(q.params.combinedClasses) {                if(r.is(".next")) {                    r.addClass("next-disabled")                } else {                    if(r.is(".previous")) {                        r.addClass("previous-disabled")                    }                }            }        }).hover(function() {            g(this).toggleClass("hover")        })    }    function o(q) {        q.$elts.pagination = g('<div class="center-wrap"><div class="carousel-pagination"><p></p></div></div>')[((q.params.paginationPosition == "outside")?"insertAfter":"appendTo")](q.$elts.carousel).find("p");        q.$elts.paginationBtns = g([]);        q.$elts.content.find("li").each(function(r) {            if(r % q.params.dispItems == 0) {                k(q,r)            }        })    }    function k(r,q) {        if(r.params.pagination) {            r.$elts.paginationBtns = r.$elts.paginationBtns.add(g('<a role="button"><span>' + r.params.tabLabel(r.$elts.paginationBtns.length + 1) + "</span></a>").data("firstStep",q)).appendTo(r.$elts.pagination);            r.$elts.paginationBtns.slice(0,1).addClass("active");            r.$elts.paginationBtns.click(function(s) {                e(r,g(this).data("firstStep"));                if(r.params.stopSlideBtn == true) {                    r.$elts.stopSlideBtn.trigger("pause")                } else {                    m(r)                }            })        }    }    function n(q) {        if(q.params.useAddress && g.isFunction(g.fn.address)) {            g.address.init(function(s) {                var r = g.address.pathNames();                if(r[0] === q.params.adressIdentifier &&  !  ! r[1]) {                    e(q,r[1] - 1)                } else {                    g.address.value("/" + q.params.adressIdentifier + "/1")                }            }).change(function(s) {                var r = g.address.pathNames();                if(r[0] === q.params.adressIdentifier &&  !  ! r[1]) {                    e(q,r[1] - 1)                }            })        } else {            q.params.useAddress = false        }    }    function e(q,r) {        q.params.callback(r);        l(q,r);        q.steps.first = r;        i(q);        if(q.params.useAddress) {            g.address.value("/" + q.params.adressIdentifier + "/" + (r + 1))        }    }    function j(r,q) {        if(q == "prev") {            if( ! r.params.showEmptyItems) {                if(r.steps.first == 0) {                    return((r.params.loop)?(r.steps.count - r.params.dispItems):false)                } else {                    return Math.max(0,r.steps.first - r.params.dispItems)                }            } else {                if((r.steps.first - r.params.dispItems) >= 0) {                    return r.steps.first - r.params.dispItems                } else {                    return((r.params.loop)?(r.steps.count - r.params.dispItems):false)                }            }        } else {            if(q == "next") {                if((r.steps.first + r.params.dispItems) < r.steps.count) {                    if( ! r.params.showEmptyItems) {                        return Math.min(r.steps.first + r.params.dispItems,r.steps.count - r.params.dispItems)                    } else {                        return r.steps.first + r.params.dispItems                    }                } else {                    return((r.params.loop)?0:false)                }            }        }    }    function l(q,r) {        switch(q.params.effect) {            case"no":if(q.params.direction == "vertical") {                q.$elts.content.css("top", - (q.itemHeight * r) + "px")            } else {                q.$elts.content.css("left", - (q.itemWidth * r) + "px")            }            break;            case"fade":if(q.params.direction == "vertical") {                q.$elts.content.hide().css("top", - (q.itemHeight * r) + "px").fadeIn(q.params.animSpeed)            } else {                q.$elts.content.hide().css("left", - (q.itemWidth * r) + "px").fadeIn(q.params.animSpeed)            }            break;            default:if(q.params.direction == "vertical") {                q.$elts.content.stop().animate({                    top: - (q.itemHeight * r) + "px"                }                ,q.params.animSpeed,q.params.slideEasing)            } else {                q.$elts.content.stop().animate({                    left: - (q.itemWidth * r) + "px"                }                ,q.params.animSpeed,q.params.slideEasing)            }            break        }    }    function i(q) {        if(j(q,"prev") !== false) {            q.$elts.prevBtn.trigger("enable")        } else {            q.$elts.prevBtn.trigger("disable")        }        if(j(q,"next") !== false) {            q.$elts.nextBtn.trigger("enable")        } else {            q.$elts.nextBtn.trigger("disable")        }        if(q.params.pagination) {            q.$elts.paginationBtns.removeClass("active").filter(function() {                return(g(this).data("firstStep") == q.steps.first)            }).addClass("active")        }    }    function f(q) {        q.delayAutoSlide = window.setTimeout(function() {            q.autoSlideInterval = window.setInterval(function() {                e(q,j(q,"next"))            }            ,q.params.autoSlideInterval)        }        ,q.params.delayAutoSlide)    }    function m(q) {        window.clearTimeout(q.delayAutoSlide);        window.clearInterval(q.autoSlideInterval);        q.params.delayAutoSlide = 0    }    function a(r) {        var q = r.$elts.stopSlideBtn;        q.bind({            play:function() {                f(r);                q.removeClass("pause").addClass("play").html(r.params.stopSlideTextPause)            }            ,pause:function() {                m(r);                q.removeClass("play").addClass("pause").html(r.params.stopSlideTextPlay)            }        });        q.click(function(s) {            if(q.is(".play")) {                q.trigger("pause")            } else {                if(q.is(".pause")) {                    q.trigger("play")                }            }        });        q.prependTo(r.$elts.wrap)    }    function p(q) {        return q.$elts.pagination.children().length    }    function b(q) {        return q.steps.first/q.params.dispItems    }    function h(q) {        q.$elts.carousel.prepend(q.$elts.loader);        g.ajax({            url:q.params.ajaxUrl            ,dataType:"json"            ,success:function(r) {                q.lastItemsToLoad = r.bLastItemsToLoad;                g(q.$elts.content).append(r.shtml);                q.steps =  {                    first:q.steps.first + q.params.dispItems                    ,count:q.$elts.content.children().length                };                q.steps.last = q.steps.count - 1;                c(q);                k(q,q.steps.first);                e(q,q.steps.first);                if(q.params.stopSlideBtn == true) {                    q.$elts.stopSlideBtn.trigger("pause")                } else {                    m(q)                }                q.$elts.loader.remove()            }        })    }})(jQuery);