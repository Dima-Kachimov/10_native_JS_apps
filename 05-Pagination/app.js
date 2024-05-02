'use strict';

// Функция котрая выполняет запрос на сервер и возвращает данные
async function getDataApi(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

// Главная функция
async function main() {
    // Получаем данные из API по запросу
    const postsData = await getDataApi(
        'https://jsonplaceholder.typicode.com/posts'
    );

    // Создаем локальные переменные текущей страницы и всего отображаемых страниц
    let currentPage = 1;
    let rows = 10;

    // Создаем функцию которая отобразит посты на стрнаице принимает 3 аргумента масив с данными, количество страниц, текущую сьраницу
    const displayList = (arrData, rows, page) => {
        // Находим елемент где будут отрисованы все посты
        const postsEl = document.querySelector('.posts');

        // Перед его рендером обновляем сонтент и делаем его пустым перед заполнением
        postsEl.innerHTML = '';

        // Сбразываем на - 1 текущую страницу потомучто елементы массива начинаються с 0
        page--;

        // Создаем контрольные точки и обрезаем массив
        const start = rows * page;
        const end = start + rows;
        const paginatedData = arrData.slice(start, end);

        // По обреззаному массиву итерируемся и отресовуем елемны на стрнице
        paginatedData.forEach((el, index) => {
            postsEl.innerHTML += `<h1>${index + 1}.  ${el.title}</h1>`;
        });
    };

    // Создаем функцию по отображению елементов пагинации принимает массив с данными и количество страниц
    const displayPagination = (arrData, rows) => {
        // Находим елемент где будет рендер пагинации
        const paginationEl = document.querySelector('.pagination');

        // Узнаем количество страниц
        const pagesCount = Math.ceil(arrData.length / rows);

        // Итерируемся по каждому числу циклом
        for (let i = 1; i <= pagesCount; i++) {
            // Создаем кнопку пагинации
            const button = document.createElement('button');

            // Заполняем кнопку контентом
            button.textContent = i;

            // Проверка для отресовки стилей первой страницы
            if (currentPage === i) {
                button.classList.add('btn__active');
            }

            // Вешаем собитие клик на каждую кнопку
            button.addEventListener('click', () => {
                // Находим елемент который был прежде выбран и убераем у него стили активной кнопки
                const currentElBtn = document.querySelector('.btn__active');
                currentElBtn.classList.remove('btn__active');

                // На текущую кнопку устанавливаем стили активной кнопки
                button.classList.add('btn__active');

                // Меняем глобальную переменную текущей страницы
                currentPage = i;

                // И запускаем функцию запуск рендера постов с новыми данными
                displayList(postsData, rows, currentPage);
            });

            // Добовляем елементы в контейнер для кнопок пагинации
            paginationEl.append(button);
        }
    };

    // Первичный запуск отображения постов
    displayList(postsData, rows, currentPage);

    // Первичный запуск отображения пагинации
    displayPagination(postsData, rows);
}

// Вызов главной функции
main().then();
