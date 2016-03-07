$(function () {

    //$.each( $('.projects'), function () {
    //
    //    new Filter( $(this) );
    //
    //} );

    var $container = $('.projects__items').isotope({
        // options
        itemSelector: '.projects__item-wrap',
        masonry: {
            columnWidth: 0
        },
        getSortData: {
            category: '[data-category]'
        }
    });

    // filter functions
    var filterFns = {
        // show if number is greater than 50
        numberGreaterThan50: function() {
            var number = $(this).find('.number').text();
            return parseInt( number, 10 ) > 50;
        },
        // show if name ends with -ium
        ium: function() {
            var name = $(this).find('.name').text();
            return name.match( /ium$/ );
        }
    };

    $('.projects__filters').on( 'click', '.projects__filters-item', function() {
        var filterValue = $( this ).attr('data-filter');
        // use filterFn if matches value
        filterValue = filterFns[ filterValue ] || filterValue;
        $container.isotope({ filter: filterValue });
    });

});

var Filter = function (obj)   {

    //private properties
    var _self = this,
        _obj = obj,
        _sliderSwiper,
        _slider = _obj.find('.swiper-container'),
        _window = $( window );

    //private methods
    var _onEvents = function () {

            _window.on( {
                'load': function () {

                    _initSlider();

                }
            } );

        },_initSlider = function () {

            _sliderSwiper = new Swiper(_slider, {

                pagination: '.swiper-pagination',
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                paginationClickable: true,
                //mousewheelControl: true,
                //direction: 'vertical',
                effect: 'coverflow',
                coverflow: {
                    rotate: 90,
                    stretch: 0,
                    depth: 300,
                    modifier: 1,
                    slideShadows : true
                },
                speed: 500

            });

        },
        _init = function () {

            _onEvents();
            _obj[0].obj = _self;

        };

    _init();
};