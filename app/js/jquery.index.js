$( function () {

    $.each( $('.movie-slider'), function () {

        new SliderSingle( $(this) );

    } );

} );

var SliderSingle = function ( obj )   {

    //private properties
    var _self = this,
        _obj = obj,
        _sliderSwiper,
        _slider = _obj.find( '.swiper-container' ),
        _btnPrev = _obj.find( '.swiper-container .swiper-button-prev' ),
        _btnNext = _obj.find( '.swiper-container .swiper-button-next' ),
        _window = $( window );

    //private methods
    var _hideButton = function() {

            setTimeout( function() {

                _btnPrev.addClass( 'hidden' );
                _btnNext.addClass( 'hidden' );

            }, 3000 )

        },
        _init = function () {

            _onEvents();
            _obj[0].obj = _self;

        },
        _initSlider = function () {

            _sliderSwiper = new Swiper(_slider, {
                pagination: '.swiper-pagination',
                nextButton: _btnNext,
                prevButton: _btnPrev,
                paginationClickable: true,
                effect: 'coverflow',
                loop: true,
                coverflow: {
                    rotate: 90,
                    stretch: 0,
                    depth: 300,
                    modifier: 1,
                    slideShadows : true
                },
                speed: 500
            } );

        },
        _onEvents = function () {

            _window.on( {
                load: function () {

                    _initSlider();
                    _hideButton();

                }
            } );

        };

    _init();
};