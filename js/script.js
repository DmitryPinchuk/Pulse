$(document).ready(function () {

    $('ul.catalogue__tabs').on('click', 'li:not(.catalogue__tab_active)', function () {
        $(this)
            .addClass('catalogue__tab_active').siblings().removeClass('catalogue__tab_active')
            .closest('div.container').find('div.catalogue__content').removeClass('catalogue__content_active').eq($(this).index()).addClass('catalogue__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalogue-item__content').eq(i).toggleClass('catalogue-item__content_active');
                $('.catalogue-item__list').eq(i).toggleClass('catalogue-item__list_active');
            });
        });
    }

    toggleSlide('.catalogue-item__link');
    toggleSlide('.catalogue-item__link_back');

    const slider = tns({
        container: '.carousel__inner',
        items: 1,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        nav: false,
    });

    document.querySelector('.prev').onclick = function () {
        slider.goTo('prev');
    };

    document.querySelector('.next').onclick = function () {
        slider.goTo('next');
    };

    //modal

    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });



    $('.button_catalogue').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__subheader').text($('.catalogue-item__header').eq(i).text());
            $('.button_catalogue').on('click', function () {
                $('.overlay, #order').fadeIn('slow');
            });
        });
    });




    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Введите имя",
                    minlength: jQuery.validator.format("Минимум {0} символов")
                },
                phone: "Введите телефон",
                email: {
                    required: "Нам нужен ваш емэйл",
                    email: "Ваш емэйл должен быть в формате name@domain.com"
                }
            }
        });
    }

    validateForms('#consultation form');
    validateForms('#order form');
    validateForms('#consultation-form');

    $.fn.setCursorPosition = function (pos) {
        if ($(this).get(0).setSelectionRange) {
            $(this).get(0).setSelectionRange(pos, pos);
        } else if ($(this).get(0).createTextRange) {
            var range = $(this).get(0).createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };
    $('input[name=phone]').click(function () {
        $(this).setCursorPosition(0); // set position number
    });

    $('input[name=phone]').mask(" (999) 999-9999");

    //pageup scroll

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    new WOW().init();
});