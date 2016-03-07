$(function () {

    $.each( $('.projects'), function () {

        new Filter( $(this) );

    } );

});

var Filter = function ( obj )   {

    //private properties
    var _self = this,
        _obj = obj,
        _wrap = _obj.find( '.projects__items' ),
        _filterBtn = _obj.find( '.projects__filters-item' ),
        _isotope,
        _window = $( window );

    //private methods
    var _onEvents = function () {

            _window.on( {
                'load': function () {

                    _initIsotope();

                }
            } );

            _filterBtn.on( {
                'click': function () {

                    _filterProjects( $( this ) );

                }
            } );

        },
        _filterProjects = function ( elem ) {

            var selector = elem.attr( 'data-filter' );

            _filterBtn.removeClass( 'active' );
            elem.addClass( 'active' );

            _isotope.isotope( {
                filter: selector
            } );

            return false;

        },
        _initIsotope = function () {

            _isotope = _wrap.isotope({
                itemSelector: '.projects__item-wrap',
                masonry: {
                    columnWidth: 0
                },
                getSortData: {
                    category: '[data-category]'
                }
            });

        },
        _init = function () {

            _onEvents();
            _obj[0].obj = _self;

        };

    _init();
};