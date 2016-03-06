$( function(){

    $.each( $( '.project-gallery' ), function(){

        new ProjectGallery ( $( this ) );

    } );

} );

var ProjectGallery = function ( obj ) {

    var _self = this,
        _obj = obj,
        _previewWrap = _obj.find( '.project-gallery__preview' ),
        _prevewItem = _previewWrap.find( '.swiper-slide' ),
        _prevewBtnNext = _previewWrap.find( '.swiper-button-next'),
        _prevewBtnPrev = _previewWrap.find( '.swiper-button-prev'),
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
            });

            _prevewItem.on({
                click: function(){
                    return false;
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
                watchSlidesVisibility: true,
                nextButton: _prevewBtnNext,
                prevButton: _prevewBtnPrev,
                speed: 700,
                onSlideChangeEnd: function(){
                    var curLinkIndex = _previewWrap.find( '.swiper-slide-active' ).index();
                    _mainPicWrap[0].bigSizeGallery.slideSwiper( curLinkIndex );
                }
            });

        },
        _getScrollWidth = function(){
            var div = document.createElement( 'div' ),
                scrollWidth;

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
            new BigSizeGallery( _mainPicWrap, _prevewItem );
            _addEvents();
            _obj[0].obj = _self;
        },
        _updateSwiper = function(){

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

var BigSizeGallery = function ( obj, _links ) {

    var _self = this,
        _obj = obj,
        _swiperWrapper,
        _swiperBtnNext,
        _swiperBtnPrev,
        _swiper;

    var _addEvents = function () {},
        _addVideo = function () {

            var src = _obj.find( '.swiper-slide-active').attr( 'data-src' ),
                innerContent = $( '<iframe src="' + src + '"> frameborder="0" allowfullscreen></iframe>' );

            _obj.find( '.swiper-slide-active' ).find( '.project-gallery__main-video' ).prepend( innerContent );

        },
        _addingVariables = function(){

            _swiperWrapper = $( '<div class="swiper-wrapper"/>' );
            _swiperBtnNext = $( '<div class="swiper-button-next"/>' );
            _swiperBtnPrev = $( '<div class="swiper-button-prev"/>' );

        },
        _buildSlider = function(){
            _addingVariables();
            _contentFilling();
            _initSwiper();
            //_swiper.slideTo( index, 0 );
        },
        _contentFilling = function(){

            $.each( _links, function(){

                var innerContent, dataSRC, preloader;

                if ( $( this ).hasClass( 'swiper-slide_video' ) ){

                    preloader = '<i class="fa fa-spinner fa-spin"></i>';
                    innerContent = '<div class="project-gallery__main-video"/>';
                    dataSRC = 'data-src="' + $( this ).attr( "href" ) + '"';

                } else {

                    preloader = '';
                    innerContent = '';
                    dataSRC = 'style="background-image: url(' + $( this ).attr( 'href' ) + ');"';

                }

                var newItem = $( '<div class="swiper-slide"' + dataSRC + '>\
                                        ' + preloader + '\
                                        ' + innerContent + '\
                                    </div>' );

                _swiperWrapper.append( newItem );

            } );

            _obj.append( _swiperWrapper );
            _obj.append( _swiperBtnNext );
            _obj.append( _swiperBtnPrev );

        },
        _init = function () {
            _buildSlider();

            if ( _obj.find( '.swiper-slide-active').attr( 'data-src' ) != undefined ){
                _addVideo();
            }

            _addEvents();
            _obj[0].bigSizeGallery = _self;
        },
        _initSwiper = function(){

            _swiper = new Swiper( _obj, {
                nextButton: _swiperBtnNext,
                prevButton: _swiperBtnPrev,
                slidesPerView: 1,
                paginationClickable: true,
                effect: 'fade',
                onSlideChangeEnd: function(){
                    var activeElem = _obj.find( '.swiper-slide-active').attr( 'data-src' );
                    _removeVideo();
                    if ( activeElem != undefined ){
                        _addVideo();
                    }
                }
            });

        },
        _removeVideo = function(){

            var items = _obj.find( '.swiper-slide' ),
                videoFrame = items.find( '.project-gallery__main-video iframe' );
            videoFrame.remove();

        },
        _slideSwiper = function( curIndex ){
            _swiper.slideTo( curIndex );
        };

    _self.slideSwiper = function( curIndex ){
        _slideSwiper( curIndex );
    };

    _init();

};