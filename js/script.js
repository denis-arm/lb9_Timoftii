window.onload = function() {
    // --- 1. Мобильное меню (Гамбургер) ---
    const hamburger = document.getElementById('hamburger');
    
    if (hamburger) {
        hamburger.onclick = function() {
            let topNav = document.getElementById('myTopnav');
            if (topNav.className === 'responsive') {
                topNav.className = '';
            } else {
                topNav.className = 'responsive';
            }
        }
    }

    // --- 2. Плавная прокрутка (С учетом перехода по страницам) ---
    const menuList = document.querySelectorAll('.menu-element');
    
    menuList.forEach(function(element) {
        element.addEventListener('click', function(event) {
            // Проверяем, есть ли у ссылки атрибут data-link
            const elementLink = element.dataset.link;
            
            // Если атрибут есть, значит это якорная ссылка на текущей странице
            if (elementLink) {
                event.preventDefault(); // Отменяем только если это плавный скролл
                const target = document.getElementById(elementLink);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // Если data-link нет, браузер выполнит стандартный переход по href (например, на contacts.html)
        });
    });
}