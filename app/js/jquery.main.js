$(function(){

    'use strict';

    $(function(){

        $.each( $('.full-height'), function () {

            new FullHeightScreen( $(this) );

        } );

        $.each( $( '.site__menu' ), function() {

            new Menu ( $( this ) );

        } );

    });

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
            _header = $( '.site__header' ),
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
                });

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

} );