$( function(){

    $.each( $( '.tabs' ), function(){
        new Tabs ( $( this ) )
    } );

} );

var Tabs = function ( obj ) {

    var _self = this,
        _obj = obj,
        _path = _obj.data( 'path' ),
        _body = $( 'body' ),
        _head = _obj.find( '.tabs__controls-main' ),
        _tabBtn = _obj.find( '.tabs__controls-wrap > div' ),
        _tabBtnInner = _tabBtn.find( '.tabs__controls-item' ),
        _tabContent = _obj.find( '.tabs__content' ),
        _controls = _obj.find( '.tabs__controls-wrap' ),
        _request = new XMLHttpRequest();

    var _addEvents = function () {

            _tabBtnInner.on({
                mousedown: function(){
                    _tabContent.css({
                        height: _tabContent.innerHeight(),
                        overflow: hidden
                    }, 1);
                },
                mouseup: function(){
                    var curItem = $( this ),
                        parent = curItem.parent(),
                        index = parent.index(),
                        dataID = curItem.data( 'id' );

                    _tabBtn.removeClass( 'active' );
                    _tabBtn.eq( index ).addClass( 'active' );
                    _ajaxRequest( dataID );
                }

            });

            _head.on({
                click: function( event ){
                    _showControls();
                    event = event || window.event;
                    if ( event.stopPropagation ) {
                        event.stopPropagation();
                    } else {
                        event.cancelBubble = true;
                    }
                }
            });

            _body.on({
                click: function(){
                    _controls.removeClass( 'active' );
                }
            });

        },
        _ajaxRequest = function( dataID ){

            _request.abort();
            _request = $.ajax( {
                url: _path,
                data: {
                    loadedCount: dataID
                },
                dataType: 'html',
                timeout: 20000,
                type: 'GET',
                success: function ( msg ) {

                    _showContent( msg );

                },
                error: function ( XMLHttpRequest ) {
                    if( XMLHttpRequest.statusText != 'abort' ) {
                        alert( 'Error!' );
                    }
                }
            });

        },
        _calculateHeight = function( newWrapper ){

            _tabContent.animate({
                'height': newWrapper.innerHeight()
            }, {
                duration: 300,
                complete: function(){
                    _tabContent.removeAttr( 'style' );
                }
            });

        },
        _changeText = function(){
            var index = _tabBtn.filter( '.active' ).index(),
                curElem = _tabBtn.eq( index ).find( 'span' ),
                txt = curElem.text();
            _head.html( '' );
            _head.text( txt );
        },
        _init = function () {
            _showContentWhenLoad();
            _addEvents();
            _obj[0].obj = _self;
        },
        _showContentWhenLoad = function(){
            var index = _tabBtn.filter( '.active' ).index();
            if ( index == '-1' ){
                index = 0;
                _tabBtn.eq( index ).addClass( 'active' );
            }
            _changeText();
        },
        _showContent = function( msg ){

            var wrapper = _tabContent.find( '.tabs__content-wrap' ),
                newWrapper = $( '<div class="tabs__content-wrap"/>' );

            newWrapper.html( msg );

            wrapper.animate({
                opacity: 0
            },{
                duration: 300,
                complete: function(){
                    wrapper.remove();
                    _tabContent.append( newWrapper );
                    _calculateHeight( newWrapper );
                    _changeText();
                }
            });

        },
        _showControls = function(){
            if ( _controls.hasClass( 'active' ) ){
                _controls.removeClass( 'active' );
                return false;
            } else {
                _controls.addClass( 'active' );
            }
        };

    _init();

};