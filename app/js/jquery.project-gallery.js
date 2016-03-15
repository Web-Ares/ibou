$( function(){

    $.each( $( '.project-gallery' ), function(){

        new ProjectGallery ( $( this ) );

    } );

} );

var ProjectGallery = function ( obj ) {

    var _self = this,
        _obj = obj,
        _previewWrap = _obj.find( '.project-gallery__preview' ),
        _previewItem = _previewWrap.find( '.swiper-slide' ),
        _previewBtnNext = _previewWrap.find( '.swiper-button-next' ),
        _previewBtnPrev = _previewWrap.find( '.swiper-button-prev' ),
        _mainPicWrap = _obj.find( '.project-gallery__main' ),
        _swiper,
        _perView,
        _window = $( window ),
        _windowWidth;

    var _addEvents = function () {

            _window.on({
                resize: function(){
                    _windowWidth = _window.width() + _getScrollWidth();
                    _updateSwiper();
                }
            });

            _previewItem.on({
                click: function(){
                    var curIndex = $( this ).index();
                    _mainPicWrap[0].bigSizeGallery.slideSwiper( curIndex );
                    return false;
                }
            })

        },
        _createSwiper = function(){

            _windowWidth = $( window ).width() + _getScrollWidth();

            if ( _windowWidth < 480 ){
                _perView = 2
            } else if ( _windowWidth >= 480 && _windowWidth < 992 ){
                _perView = 3
            } else if ( _windowWidth >= 992 && _windowWidth < 1200 ){
                _perView = 4
            } else if ( _windowWidth >= 1200 ){
                _perView = 4
            }

            _swiper = new Swiper( _previewWrap, {
                slidesPerView: _perView,
                watchSlidesVisibility: true,
                nextButton: _previewBtnNext,
                prevButton: _previewBtnPrev,
                speed: 700
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
            new BigSizeGallery( _mainPicWrap, _previewItem );
            _addEvents();
            _obj[0].obj = _self;
        },
        _updateSwiper = function(){

            _swiper.params.slidesPerView = 2;

            if ( _windowWidth >= 480 && _windowWidth < 992 ){
                _swiper.params.slidesPerView = 3
            } else if ( _windowWidth >= 992 && _windowWidth < 1200 ){
                _swiper.params.slidesPerView = 4
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

    var _addVideo = function () {

            var src = _obj.find( '.swiper-slide-active' ).attr( 'data-src' ),
                innerContent = $( '<iframe src="' + src + '"> frameborder="0" allowfullscreen></iframe>' );

            _obj.find( '.swiper-slide-active' ).find( '.project-gallery__main-video' ).append( innerContent );

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
            if ( _obj.find( '.swiper-slide-active' ).attr( 'data-src' ) != undefined ){
                _addVideo();
            }
        },
        _contentFilling = function(){

            $.each( _links, function(){

                var innerContent, dataSRC,
                    curElem = $( this );

                if ( curElem.hasClass( 'swiper-slide_video' ) ){

                    innerContent = '<div class="project-gallery__main-video"/>\
                                        <span class="bounce-preloader"><span class="bounce-preloader__ball"></span></span>\
                                    </div>';
                    dataSRC = 'data-src="' + curElem.attr( "href" ) + '"';

                } else {

                    innerContent = '';
                    dataSRC = 'style="background-image: url(' + curElem.attr( 'href' ) + ');"';

                }

                var newItem = $( '<div class="swiper-slide"' + dataSRC + '>\
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
                    var activeElem = _obj.find( '.swiper-slide-active' ).attr( 'data-src' );
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