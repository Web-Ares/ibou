$( function(){

    $.each( $( '.project-gallery' ), function(){

        new ProjectGallery ( $( this ) );

    } );

} );

var ProjectGallery = function ( obj ) {

    var _self = this,
        _obj = obj,
        _previewWrap = _obj.find( '.project-gallery__preview' ),
        _mainPicWrap = _obj.find( '.project-gallery__main' ),
        _swiper,
        _perView,
        _window = $( window ),
        _windowWidth;

    var _addEvents = function () {

            _window.on({
                resize: function(){

                    _windowWidth = $( window ).width() + _getScrollWidth();

                    _updateSwiper();

                }
            })

        },
        _createSwiper = function(){

            _windowWidth = $( window ).width() + _getScrollWidth();

            if ( _windowWidth < 600 ){
                _perView = 1
            } else if ( _windowWidth >= 600 && _windowWidth < 992 ){
                _perView = 2
            } else if ( _windowWidth >= 992 && _windowWidth < 1200 ){
                _perView = 3
            } else if ( _windowWidth >= 1200 ){
                _perView = 4
            }

            _swiper = new Swiper( _previewWrap, {
                slidesPerView: _perView,
                autoplay:5000,
                watchSlidesVisibility: true,
                speed: 700
            });

        },
        _getScrollWidth = function(){
            var div = document.createElement( 'div' ),
                scrollWidth = null;

            div.style.overflowY = 'scroll';
            div.style.width = '50px';
            div.style.height = '50px';
            div.style.visibility = 'hidden';

            document.body.appendChild( div );

            scrollWidth = div.offsetWidth - div.clientWidth;

            document.body.removeChild( div );
            return scrollWidth ;
        },
        _init = function () {
            _createSwiper();
            _addEvents();
            _obj[0].obj = _self;
        },
        _updateSwiper = function(){

            console.log(_previewWrap);

            _swiper.params.slidesPerView = 1;

            if ( _windowWidth >= 600 && _windowWidth < 992 ){
                _swiper.params.slidesPerView = 2
            } else if ( _windowWidth >= 992 && _windowWidth < 1200 ){
                _swiper.params.slidesPerView = 3
            } else if ( _windowWidth >= 1200 ){
                _swiper.params.slidesPerView = 4
            }

        };


    _init();

};