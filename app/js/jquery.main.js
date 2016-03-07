$(function(){

    'use strict';

    $(function(){

        $.each( $('.full-height'), function () {

            new FullHeightScreen( $(this) );

        } );

        $.each( $( '.site__menu' ), function() {

            new Menu ( $( this ) );

        } );

        $.each($( '.preloader' ), function () {

            new Preloader($(this));

        });

        $.each( $( '.site__to-top' ), function() {

            new ToTop ( $( this ) );

        } );

    });

    var Preloader = function ( obj ) {

        var _obj = obj,
            _deelay = _obj.data( 'deelay' ),
            _window = $( window);

        var _onEvents = function () {

                _window.on({
                    load: function(){

                        setTimeout(function () {
                            _obj.addClass( 'hide' );

                            setTimeout(function () {

                                _obj.remove()

                            },400);

                        }, _deelay );

                    }
                });

            },

            _init = function () {
                _onEvents();
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

                    'resize': function () {

                        _setHeight();

                    }

                } );

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

            },
            _init = function () {

                _onEvents();
                _setHeight();
                _obj[0].obj = _self;

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
                    'click': function() {

                        _openMenu( $( this ) );

                    }
                } );

                _window.on( {
                    'resize': function () {

                        _resetStyle();

                    },
                    'scroll': function () {



                    }
                } );

            },
            _openMenu = function( elem )  {

                var curItem = elem;

                if( curItem.hasClass( 'opened' ) ) {

                    curItem.removeClass( 'opened' );
                    _menu.slideUp( 300 );

                } else {

                    curItem.addClass( 'opened' );
                    _menu.slideDown( 300 );

                }

            },
            _resetStyle = function() {

                _showBtn.removeClass( 'opened' );
                _menu.removeAttr( 'style' );

            },
            _init = function() {
                _menu[ 0 ].obj = _self;
                _addEvents();
            };

        _init();
    };

    var ToTop = function( obj ) {

        //private properties
        var _self = this,
            _toTop = obj;

        //private methods
        var _addEvents = function() {

                _toTop.on( {
                    'click': function() {

                        _scrollToTop();

                        return false;
                    }
                } );



            },
            _scrollToTop = function ()  {

                $( 'html, body' ).stop( true, false );
                $( 'html, body' ).animate( { scrollTop: 0  }, 300 );

            },
            _init = function() {
                _toTop[ 0 ].obj = _self;
                _addEvents();
            };

        _init();
    };

} );
