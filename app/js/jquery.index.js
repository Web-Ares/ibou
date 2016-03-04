$(function () {

    $.each( $('.movie-slider'), function () {

        new SliderSingle($(this));

    } );

});

var SliderSingle = function (obj) {

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
                mousewheelControl: true,
                direction: 'vertical',
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