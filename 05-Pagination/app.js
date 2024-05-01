'use strict';

async function getDataApi(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

async function main() {
    const postsData = await getDataApi(
        'https://jsonplaceholder.typicode.com/posts'
    );
    let currentPage = 1;
    let rows = 10;

    const displayList = (arrData, rows, page) => {
        const postsEl = document.querySelector('.posts');
        postsEl.innerHTML = '';
        page--;
        const start = rows * page;
        const end = start + rows;
        const paginatedData = arrData.slice(start, end);
        paginatedData.forEach((el) => {
            postsEl.innerHTML += `<h1>${el.title}</h1>`;
        });
    };
    const displayPagination = (arrData, rows) => {
        const paginationEl = document.querySelector('.pagination');
        const pagesCount = Math.ceil(arrData.length / rows);

        for (let i = 1; i <= pagesCount; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            if (currentPage == i) button.classList.add('btn__active');
            button.addEventListener('click', () => {
                const currentElBtn = document.querySelector('.btn__active');
                button.classList.add('btn__active');
                currentElBtn.classList.remove('btn__active');
                currentPage = i;
                displayList(postsData, rows, currentPage);
            });
            paginationEl.appendChild(button);
        }
    };
    const displayPaginationBtn = () => {};

    displayList(postsData, rows, currentPage);
    displayPagination(postsData, rows);
}

main().then();
