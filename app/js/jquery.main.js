$(function(){

    'use strict';

    $(function(){

        $.each( $('.full-height'), function () {

            new FullHeightScreen( $(this) );

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

} );