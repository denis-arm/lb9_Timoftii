$(document).ready(function () {
    // --- Модальное окно портфолио ---
    $('.portfolio-item').on('click', function (e) {
        e.stopPropagation();
        createPopup(e.currentTarget);
    });

    function createPopup(item) {
        const clicked = $(item);
        const src = clicked.data('src');
        const container = $('<div>', {'class': 'popup-container'});
        const img = $('<img>', {'class': 'popup', src: src});
        container.append(img);
        $('body').append(container);
        setTimeout(function () {
            container.addClass('active');
        }, 10);
        
        container.on('click', function (e) {
            if (e.target === this) {
                closePopup(container);
            }
        });
        img.on('click', function () {
            closePopup(container);
        });
    }

    function closePopup(container) {
        container.removeClass('active');
        setTimeout(function () {
            container.remove();
        }, 250);
    }

    // --- Слайдер отзывов ---
    $('.control-item').on('click', function () {
        slideTestimonials(this);
    });

    function slideTestimonials(item) {
        const clicked = $(item);
        if (clicked.hasClass('active')) {
            return;
        }
        const index = clicked.index();
        const inner = $('.testimonials-inner');
        const cardWidth = $('.testimonial-item').outerWidth(true);
        const scroll = index * cardWidth * 2;
        
        // !important в CSS на мобильных отключит этот transform
        inner.css('transform', 'translateX(-' + scroll + 'px)');
        $('.control-item').removeClass('active');
        $('.control-item').eq(index).addClass('active');
    }
});