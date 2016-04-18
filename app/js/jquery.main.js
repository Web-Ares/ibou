window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

$( function() {

    'use strict';

    $( function() {

        $.each( $('.full-height'), function () {

            new FullHeightScreen( $(this) );

        } );

        $.each( $( '.site__menu' ), function() {

            new Menu ( $( this ) );

        } );

        $.each( $( '.preloader' ), function () {

            new Preloader( $( this ) );

        } );

        $.each( $( '.site_to-block' ), function() {

            new ToBlock ( $( this ) );

        } );


    } );

    var Preloader = function ( obj ) {

        var _obj = obj,
            _loader = _obj.find( '.preloader__bar' ),
            _flag = false,
            _loadFlag = false,
            _delay = _obj.data( 'delay' ),
            _window = $( window );

        var _onEvents = function () {

                _window.on( {
                    load: function() {

                        _loadFlag = true;

                        //setTimeout( function() {
                        //
                        //    _obj.addClass( 'hide' );
                        //
                        //    setTimeout( function() {
                        //
                        //        _obj.remove();
                        //
                        //    },400);
                        //
                        //}, _delay );

                    }
                } );

            },
            _init = function() {
                _onEvents();
                _loadBar();
            },
            _loadBar = function (){

                var firstLoadVal = Math.floor(Math.random() * 10) + 1,
                    curValue = firstLoadVal;

                _loader.animate({'width':''+firstLoadVal+'%'}, 200);

                setTimeout(function () {

                    setInterval(function () {

                        var loadVal = Math.floor(Math.random() * 90) + 1;

                        if(loadVal<90 && loadVal>curValue){

                            curValue = loadVal;

                            _loader.animate({'width':''+loadVal+'%'}, 200);

                        }

                    }, 500);

                }, 1000);

                setInterval(function (){
                    if(_loadFlag){

                        _loader.animate({'width': 100+'%'}, 200);

                        _obj.css( {
                            'opacity': 0,
                            'visibility': 'hidden'
                        } );

                        setTimeout(function () {
                            //_obj.remove();
                        }, 650);

                        _flag = true

                    }
                }, 500);


            };

        _init();
    };

    var FullHeightScreen = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $( window );

        //private methods
        var _onEvents = function () {

                _window.on( {

                    resize: function () {

                        _setHeight();

                    }

                } );

            },
            _init = function () {

                _onEvents();
                _setHeight();
                _obj[0].obj = _self;

            },
            _setHeight = function () {

                if( _window.height() >= 600 ) {

                    _obj.css( {

                        'min-height': _window.height()

                    } );

                } else {

                    _obj.css( {

                        'min-height': '600px'

                    } );

                }

            };

        _init();
    };

    var Menu = function( obj ) {

        //private properties
        var _self = this,
            _menu = obj,
            _window = $( window ),
            _showBtn = $( '.site__menu-btn' );

        //private methods
        var _addEvents = function() {

                _showBtn.on( {
                    click: function() {

                        _openMenu( $( this ) );

                    }
                } );

                _window.on( {
                    resize: function () {

                        _resetStyle();

                    }
                } );

            },
            _init = function() {
                _menu[ 0 ].obj = _self;
                _addEvents();
            },
            _openMenu = function( elem )  {

                var curItem = elem;

                if( curItem.hasClass( 'opened' ) ) {

                    curItem.removeClass( 'opened' );

                } else {

                    curItem.addClass( 'opened' );
                }

            },
            _resetStyle = function() {

                _showBtn.removeClass( 'opened' );
                //_menu.removeAttr( 'style' );

            };

        _init();
    };

    var ToBlock = function( obj ) {

        //private properties
        var _self = this,
            _toBlock = obj,
            _dom = $( 'html, body');

        //private methods
        var _addEvents = function() {

                _toBlock.on( {
                    click: function() {

                        _scrollToBlock( $( this ) );

                        return false;
                    }
                } );

            },
            _init = function() {

                _toBlock[ 0 ].obj = _self;
                _addEvents();

            },
            _scrollToBlock = function ( elem )  {

                var curItem = elem,
                    blockToScroll = $( '.' + curItem.data( 'block' ) );

                _dom.stop( true, false );
                _dom.animate( { scrollTop: blockToScroll.offset().top  }, 300 );

            };

        _init();
    };

} );
