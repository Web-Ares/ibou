$(function () {

    $.each( $('.movie-slider'), function () {

        new SliderSingle($(this));

    } );

});

var SliderSingle = function (obj)   {

    //private properties
    var _self = this,
        _obj = obj,
        _sliderSwiper,
        _slider = _obj.find('.swiper-container');

    //private methods
    var _initSlider = function () {

            _sliderSwiper = new Swiper(_slider, {

                pagination: '.swiper-pagination',
                paginationClickable: true,
                direction: 'vertical'

            });

        },
        _init = function () {

            _initSlider();
            _obj[0].obj = _self;

        };

    _init();
};