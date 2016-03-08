$( function(){

    $.each( $( '.tabs' ), function(){
        new Tabs ( $( this ) )
    } );

} );

var Tabs = function ( obj ) {

    var _self = this,
        _obj = obj,
        _window = $( window ),
        _body = $( 'body' ),
        _head = _obj.find( '.tabs__controls-main' ),
        _tabBtn = _obj.find( '.tabs__controls-wrap > div' ),
        _tabBtnInner = _tabBtn.find( '> span' ),
        _tabContent = _obj.find( '.tabs__content' ),
        _controls = _obj.find( '.tabs__controls-wrap' ),
        _tabContentItem = _tabContent.find( '> div' );

    var _addEvents = function () {

        _window.on({
            'load': function(){
                _showContentWhenLoading();
            }
        });

        _tabBtnInner.on({
            mousedown: function(){
                _tabContent.css({
                    'height': _tabContent.innerHeight()
                }, 300);
            },
            mouseup: function(){
                var curItem = $(this),
                    parent = curItem.parent(),
                    index = parent.index();
                var activeContent = _tabContentItem.eq(index),
                    activeContentHeight = activeContent.innerHeight();
                _tabContent.animate({
                    'height': activeContentHeight
                }, 300);
                setTimeout(function(){
                    _tabContent.css({
                        "height": ""
                    });
                },400)
            },
            click: function(){
                var curItem = $(this),
                    parent = curItem.parent(),
                    index = parent.index();
                _tabBtn.removeClass("active");
                _tabBtn.eq(index).addClass("active");
                _showContent(index);
                _changeText(curItem);
                _controls.removeClass("active");
            }
        });

        _head.on({
            click: function(event){
                _showControls();
                event = event || window.event;
                if (event.stopPropagation) {
                    event.stopPropagation();
                } else {
                    event.cancelBubble = true;
                }
            }
        });

        _body.on({
            click: function(){
                _controls.removeClass("active");
            }
        });

    },
        _showContentWhenLoading = function(){
            var index = _tabBtn.filter('.active').index();
            if ( index == "-1" ){
                index = 0;
                _tabBtn.eq(index).addClass("active");
            }
            _showContent(index);
            var curElem = _tabBtn.eq(index).find("span");
            _changeText(curElem);
        },
        _showContent = function(i){
            var activeContent = _tabContentItem.eq(i);
            _tabContentItem.css({
                "display": "none"
            });
            activeContent.css({
                "display": "block"
            });
        },
        _showControls = function(){
            if ( _controls.hasClass("active") ){
                _controls.removeClass("active");
                return false;
            } else {
                _controls.addClass("active");
            }
        },
        _changeText = function(curItem){
            var txt = curItem.text();
            _head.html("");
            _head.text(txt);
        },
        _init = function () {
            _addEvents();
            _obj[0].obj = _self;
        };

    _init();

};