1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
$( function () {

    $.each( $('.movie-slider'), function () {

        new SliderSingle( $(this) );

    } );

    $.each( $( '.movie-slider__description' ), function() {

        new ShowDescription ( $( this ) );

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
        _description = _obj.find( '.movie-slider__description' ),
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
                autoplay: 6000,
                paginationClickable: true,
                autoplayDisableOnInteraction: false,
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

            _description.on( {
                mouseenter: function() {
                    _sliderSwiper.stopAutoplay();
                },
                mouseleave: function() {
                    _sliderSwiper.startAutoplay();
                }
            } );

            _window.on( {
                load: function () {

                    _initSlider();
                    _hideButton();

                    if( _window.width() >= 992 ) {
                        _sliderSwiper.startAutoplay();
                    } else {
                        _sliderSwiper.stopAutoplay();
                    }

                }
            } );

        };

    _init();
};

var ShowDescription = function( obj ) {

    //private properties
    var _self = this,
        _obj = obj,
        _btn = _obj.find( 'span'),
        _description = _obj.find( '.movie-slider__text'),
        _scroll = null;

    //private methods
    var _addEvents = function() {

            _btn.on( {
                click: function() {

                    _changeClass( $( this ) );

                    return false;
                }
            } );

        },
        _addNiceScroll = function() {
            _scroll = _description.niceScroll({
                enablemousewheel: true
            });
        },
        _init = function() {

            _obj[ 0 ].obj = _self;
            _addEvents();
            _addNiceScroll();

        },
        _changeClass = function ( elem )  {

            var curItem = elem;

            if( curItem.hasClass( 'opened' ) ){
                curItem.removeClass( 'opened' );

            } else {
                curItem.addClass( 'opened' );

                setTimeout( function() {
                    _description.getNiceScroll().resize();
                }, 300 );
            }

        };

    _init();
};
