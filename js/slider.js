$(document).ready(function() {
    // Массив с путями к картинкам (замените на свои реальные пути, если нужно)
    var slides = [
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80", 
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1000&q=80"
    ];
    
    var currentSlide = 0;
    var isBusy = false; // Флаг, предотвращающий "слипание" кликов во время анимации

    // Обработчик кликов по боковым переключателям
    $('.slider-arrow-left, .slider-arrow-right').click(function(e) {
        if (isBusy) return; // Если слайдер занят анимацией, игнорируем клик
        
        var el = $(e.currentTarget); // Получаем элемент, по которому кликнули
        
        // Логика переключения номера слайда
        if (el.hasClass('slider-arrow-right')) {
            currentSlide++;
            if (currentSlide >= slides.length) currentSlide = 0;
        } else {
            currentSlide--;
            if (currentSlide < 0) currentSlide = slides.length - 1;
        }

        isBusy = true; // Блокируем новые клики
        
        // Анимация перелистывания
        $('.slider-image').animate({opacity: 0}, 300, function() {
            // Меняем фон, когда картинка стала прозрачной
            $('.slider-image').css('background-image', 'url(' + slides[currentSlide] + ')');
            // Плавно проявляем картинку
            $('.slider-image').animate({opacity: 1}, 300, function() {
                isBusy = false; // Снимаем блокировку по завершении анимации
            });
        });
    });
});