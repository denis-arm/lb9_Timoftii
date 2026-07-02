$(document).ready(function() {
    $('.counter').each(function () {
        const targetValue = $(this).attr('data-target');
        $(this).prop('Counter', 0).animate({
            Counter: targetValue
        }, {
            duration: 2000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
});