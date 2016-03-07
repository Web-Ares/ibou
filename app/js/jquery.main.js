$(function () {
    $.each($( '.preloader' ), function () {

        new Preloader($(this));

    });
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

