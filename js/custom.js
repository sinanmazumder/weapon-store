(function ($) {


    //search popup
    $('document').ready(function () {
        $('.main-search').click(function () {
            $('.search-popup').addClass('active');
        });
        $('.cross').click(function () {
            $('.search-popup').removeClass('active');
        });
    });


    //main carousel
    $('document').ready(function () {

        var sync1 = $("#sync1");
        var sync2 = $("#sync2");
        var slidesPerPage = 4; //globaly define number of elements per page
        var syncedSecondary = false;

        sync1.owlCarousel({
            items: 1,
            slideSpeed: 2000,
            nav: true,
            autoplay: true,
            dots: false,
            loop: true,
            animateOut: 'fadeOut',
            //responsiveRefreshRate: 200,
            autoplayTimeout: 6000,
            smartSpeed: 2000,
            navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
        }).on('changed.owl.carousel', syncPosition);

        sync2
            .on('initialized.owl.carousel', function () {
                sync2.find(".owl-item").eq(0).addClass("current");
            })
            .owlCarousel({
                items: slidesPerPage,
                dots: false,
                nav: false,
                smartSpeed: 200,
                mouseDrag: false,
                slideSpeed: 500,
                ssslideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
                responsiveRefreshRate: 100
            }).on('changed.owl.carousel', syncPosition2);

        function syncPosition(el) {
            //if you set loop to false, you have to restore this next line
            //var current = el.item.index;

            //if you disable loop you have to comment this block
            var count = el.item.count - 1;
            var current = Math.round(el.item.index - (el.item.count / 2) - .5);

            if (current < 0) {
                current = count;
            }
            if (current > count) {
                current = 0;
            }

            //end block

            sync2
                .find(".owl-item")
                .removeClass("current")
                .eq(current)
                .addClass("current");
            var onscreen = sync2.find('.owl-item.active').length - 1;
            var start = sync2.find('.owl-item.active').first().index();
            var end = sync2.find('.owl-item.active').last().index();

            if (current > end) {
                sync2.data('owl.carousel').to(current, 100, true);
            }
            if (current < start) {
                sync2.data('owl.carousel').to(current - onscreen, 100, true);
            }
        }

        function syncPosition2(el) {
            if (syncedSecondary) {
                var number = el.item.index;
                sync1.data('owl.carousel').to(number, 100, true);
            }
        }

        sync2.on("click", ".owl-item", function (e) {
            e.preventDefault();
            var number = $(this).index();
            sync1.data('owl.carousel').to(number, 300, true);
        });

        $('.header .owl-carousel').on("changed.owl.carousel", function (event) {
            // selecting the current active item
            var item = event.item.index - 2;
            // first removing animation for all captions
            $('p').removeClass('animated fadeInDown');
            $('.owl-item').not('.cloned').eq(item).find('p').addClass('animated fadeInDown');

            $('h1').removeClass('animated zoomIn');
            $('.owl-item').not('.cloned').eq(item).find('h1').addClass('animated zoomIn');

            $('button').removeClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('button').addClass('animated fadeInUp');

        })


    });


    // preloader 
    $(window).on('load', function () {
        $('.wrapper').fadeOut();
        $('.wrapper').delay(1350).fadeOut(5000);
        $('body').delay(1350).css({
            'overflow': 'visible'
        });
    });



    // parallax image
    $('document').ready(function () {
        $(window).scroll(function (e) {
            parallax();
        })


        function parallax() {
            var scroll = $(window).scrollTop();
            var screenHeight = $(window).height();

            $('.parallax').each(function () {
                var offset = $(this).offset().top;
                var distanceFromBottom = offset - scroll - screenHeight

                if (offset > screenHeight && offset) {
                    $(this).css('background-position', 'center ' + ((distanceFromBottom) * 0.2) + 'px');
                } else {
                    $(this).css('background-position', 'center ' + ((-scroll) * 0.2) + 'px');
                }
            })
        }
    });


    //upcoming event carousel
    $('document').ready(function () {
        $('.upcoming-event .owl-carousel').owlCarousel({
            loop: true,
            margin: 20,
            dots: false,
            nav: true,
            navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        })
    });

    $('document').ready(function () {
        $('.list-icon').click(function () {
            $('.products-grid').slideUp(500);
            $('.products-list').slideDown(500);
            $('.list-icon').addClass('active');
            $('.grid-icon').removeClass('active');
        });
        $('.grid-icon').click(function () {
            $('.products-grid').slideDown(500);
            $('.products-list').slideUp(500);
            $('.grid-icon').addClass('active');
            $('.list-icon').removeClass('active');
        });
    });


    //upcoming event tabs
    $('document').ready(function () {
        $('.upcoming-event .tabs .header-div1').click(function () {
            $('.upcoming-event .tabs .content1').slideToggle(500);
            $('.upcoming-event .header-div1 .toggle h1').toggleClass('active');
            $('.upcoming-event .content2,.upcoming-event .content3').slideUp(500);
            $('.header-div2 .toggle h1,.header-div3 .toggle h1').removeClass('active');
        });
        $('.upcoming-event .tabs .header-div2').click(function () {
            $('.upcoming-event .tabs .content2').slideToggle(500);
            $('.upcoming-event .header-div2 .toggle h1').toggleClass('active');
            $('.upcoming-event .content1,.upcoming-event .content3').slideUp(500);
            $('.header-div1 .toggle h1,.header-div3 .toggle h1').removeClass('active');
        });
        $('.upcoming-event .tabs .header-div3').click(function () {
            $('.upcoming-event .tabs .content3').slideToggle(500);
            $('.upcoming-event .header-div3 .toggle h1').toggleClass('active');
            $('.upcoming-event .content1,.upcoming-event .content2').slideUp(500);
            $('.header-div1 .toggle h1,.header-div2 .toggle h1').removeClass('active');
        });
    });


    //video popup 
    $(function () {
        $('.parent-container').magnificPopup({
            type: 'iframe'
            // other options
        });
    });


    //products carousel
    $('document').ready(function () {
        $('.products .owl-carousel').owlCarousel({
            loop: true,
            autoplay: true,
            margin: 20,
            dots: false,
            nav: true,
            smartSpeed: 1000,
            autoplayTimeout: 2800,
            navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 4
                }
            }
        })
    });


    //products carousel
    $('document').ready(function () {
        $('.twitte-slider .owl-carousel').owlCarousel({
            loop: true,
            autoplay: true,
            margin: 20,
            dots: false,
            nav: true,
            smartSpeed: 1000,
            autoplayTimeout: 3200,
            navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
            items: 1,
        })
    });


    //isotope
    $('document').ready(function () {
        $('.grid').isotope();
    });


    //video popup 
    $(function () {
        $('.img-popup').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true,
            }
            // other options
        });
    });

    //products carousel
    $('document').ready(function () {
        $('.latest-news .owl-carousel').owlCarousel({
            loop: true,
            autoplay: true,
            margin: 0,
            dots: false,
            nav: false,
            smartSpeed: 1000,
            autoplayTimeout: 3200,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 2
                }
            }
        })
    });


    //scroll top
    $('document').ready(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 260) {
                $('.scroll-top').fadeIn();
            } else {
                $(".scroll-top").fadeOut();
            }
        });
        $('.scroll-top').click(function () {
            $("html,body").animate({
                scrollTop: 0
            }, 1000);
        });
    });


    //price slider
    $(function () {
        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 5000,
            values: [750, 3000],
            slide: function (event, ui) {
                $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
            }
        });
        $("#amount").val("$" + $("#slider-range").slider("values", 0) +
            " - $" + $("#slider-range").slider("values", 1));
    });

   $('document').ready(function(){
       $("html").niceScroll({
           cursorwidth:8,
           cursorheight:100,
           cursorborderradius:10,
           cursorborder:'none',
           cursorcolor:'#878244',
       });
   })




})(jQuery)









//map

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        maxZoom: 18,
        minZoom: 16,
        disableDefaultUI: false,
        scrollwheel: false,
        draggable: true,
        center: {
            lat: 23.8671078,
            lng: 90.3850752
        },
        styles: [
            {
                elementType: 'geometry',
                stylers: [{
                    color: '#242f3e'
                }]
            },
            {
                elementType: 'labels.text.stroke',
                stylers: [{
                    color: '#242f3e'
                }]
            },
            {
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#746855'
                }]
            },
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#d59563'
                }]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#d59563'
                }]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{
                    color: '#263c3f'
                }]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#6b9a76'
                }]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{
                    color: '#38414e'
                }]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{
                    color: '#212a37'
                }]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#9ca5b3'
                }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{
                    color: '#746855'
                }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{
                    color: '#1f2835'
                }]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#f3d19c'
                }]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{
                    color: '#2f3948'
                }]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#d59563'
                }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{
                    color: '#17263c'
                }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#515c6d'
                }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{
                    color: '#17263c'
                }]
            }
          ]


    });

    var marker = new google.maps.Marker({
        position: map.getCenter(),
        icon: 'images/map.png',
        draggable: false,
        map: map
    });

}
