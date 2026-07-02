// 1. Переменная, хранящая данные в формате JSON-строки (Имитация ответа сервера для ФТИ)
const rawData = `[
    {
        "id": 1,
        "title": "Студенты ФТИ разработали прототип автоматизированного метеозонда",
        "text": "Команда студентов 3 курса кафедры общей физики успешно завершила сборку и тестирование исследовательского зонда. Устройство способно измерять давление, влажность и радиационный фон на высоте до 2000 метров и передавать данные по радиоканалу в режиме реального времени. Руководитель проекта отметил высокий потенциал разработки.",
        "author": "Кафедра ОФ",
        "comments": 12,
        "date": "15.05.2026",
        "likes": 42,
        "tags": ["наука", "студенты", "физика"],
        "image": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": 2,
        "title": "Открытие обновленной IT-лаборатории СУБД и веб-технологий",
        "text": "При поддержке ведущих технологических компаний региона в корпусе ФТИ открылся новый компьютерный класс. Лаборатория укомплектована современными рабочими станциями и серверным оборудованием. Здесь будут проходить профильные занятия по веб-разработке, программированию на Python/JS и администрированию баз данных.",
        "author": "Деканат",
        "comments": 5,
        "date": "10.05.2026",
        "likes": 56,
        "tags": ["it", "новости", "разработка"],
        "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": 3,
        "title": "Подготовка к Республиканской олимпиаде по физике и математике",
        "text": "ФТИ Тирасполя традиционно выступает главной площадкой проведения финального этапа олимпиады. В этом году участие примут более 150 школьников со всех городов. Преподаватели нашего института уже сформировали уникальные комплекты теоретических задач и лабораторных экспериментов повышенной сложности.",
        "author": "Оргкомитет",
        "comments": 3,
        "date": "01.05.2026",
        "likes": 29,
        "tags": ["физика", "новости", "олимпиада"],
        "image": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80"
    }
]`;

// 2. Строковая переменная-шаблон для карточки (содержит плейсхолдеры для замены)
const cardTemplate = `
    <section class="blog-card">
        <div class="blog-card-top">
            <img src="%image%" alt="%title%" class="blog-card-img">
            <div class="blog-card-meta">
                <span class="blog-author">✍ Автор: %author%</span>
                <span class="blog-comments">💬 Комментарии (%comments%)</span>
            </div>
        </div>
        <div class="blog-card-body">
            <h2>%title%</h2>
            <p class="blog-card-text">%text%</p>
            <div class="blog-card-tags">
                %tags%
            </div>
        </div>
        <div class="blog-card-footer">
            <span class="blog-date">📅 Дата публикации: %date%</span>
            <span class="blog-likes">❤ Понравилось: %likes%</span>
        </div>
    </section>
`;

// 3. Функция отрисовки карточек на странице
function drawCards(dataArray) {
    const container = $('#blog-posts');
    container.html(''); // Полностью очищаем контейнер перед выводом (методика ЛБ7)

    // Если ничего не найдено по фильтрам
    if (dataArray.length === 0) {
        container.html('<p style="text-align:center; color:#718096; margin-top:30px;">По вашему запросу статей не найдено.</p>');
        return;
    }

    // Проходим основным циклом по массиву объектов
    dataArray.forEach(item => {
        // Вложенный цикл/обработка для генерации HTML-кода тегов
        let tagsHTML = '';
        item.tags.forEach(tag => {
            tagsHTML += `<span class="tag">${tag}</span>`;
        });

        // Заменяем маркеры в шаблоне на реальные данные объекта
        let htmlCard = cardTemplate
            .replace('%title%', item.title)
            .replace('%title%', item.title) // Повторный вызов для атрибута alt у картинки
            .replace('%image%', item.image)
            .replace('%author%', item.author)
            .replace('%comments%', item.comments)
            .replace('%text%', item.text)
            .replace('%tags%', tagsHTML)
            .replace('%date%', item.date)
            .replace('%likes%', item.likes);

        // Добавляем готовую карточку в DOM-структуру
        container.append(htmlCard);
    });

    // Важнейший нюанс методички: так как старые элементы удалены,
    // нужно заново инициализировать события клика на новые сгенерированные теги!
    initTagClicks();
}

// 4. Функция фильтрации по текстовому поиску
function handleSearch() {
    const searchVal = $('#search-input').val().trim().toLowerCase();
    
    // Парсим исходную JSON-строку, чтобы получить чистый массив объектов
    const allPosts = JSON.parse(rawData);

    // Фильтруем массив с помощью метода filter() и проверки вхождения indexOf / includes
    const filteredPosts = allPosts.filter(post => {
        const titleMatch = post.title.toLowerCase().includes(searchVal);
        const textMatch = post.text.toLowerCase().includes(searchVal);
        return titleMatch || textMatch; // Статья подходит, если слово есть в заголовке ИЛИ тексте
    });

    // Отрисовываем отфильтрованный результат
    drawCards(filteredPosts);
}

// 5. Функция активации кликов по тегам
function initTagClicks() {
    $('.tag').off('click').on('click', function() {
        const clickedTag = $(this).text().trim();
        const allPosts = JSON.parse(rawData);

        // Фильтруем: оставляем только те статьи, у которых в массиве tags есть выбранный тег
        const filteredPosts = allPosts.filter(post => post.tags.includes(clickedTag));

        // Подсвечиваем поисковую строку для наглядности (что ищем по тегу)
        $('#search-input').val(`Тег: ${clickedTag}`);

        drawCards(filteredPosts);
    });
}

// 6. Инициализация логики при полной загрузке DOM (аналог $(document).ready)
$(function() {
    // Первичный запуск: парсим JSON строку и выводим все карточки на экран
    const initialData = JSON.parse(rawData);
    drawCards(initialData);

    // Навешиваем обработчик клика на кнопку «Искать»
    $('#search-btn').on('click', function() {
        handleSearch();
    });

    // Дополнительное удобство: поиск срабатывает при нажатии Enter в поле ввода
    $('#search-input').on('keypress', function(e) {
        if (e.which === 13) {
            handleSearch();
        }
    });
});