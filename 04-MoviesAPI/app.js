'use strict';

const form = document.querySelector('form');
const searchInput = document.querySelector('.search');
const logo = document.querySelector('.logo');
const modalWindow = document.querySelector('.modal__overlay');

const API_KEY = 'ceef2047-66e0-4576-9f66-941ceaf2a54b';
const API_URL_POPULAR =
    'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1';
const API_URL_SEARCH =
    'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';
const API_URL_MOVIE_ID = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';

async function getMovies(url) {
    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY,
        },
    });
    const resData = await res.json();
    if (resData.items || resData.films) {
        renderItemMovie(resData.items ? resData.items : resData.films);
        console.log(resData.items, resData.films);
    }
}

getMovies(API_URL_POPULAR).then();

function renderItemMovie(data) {
    const moviesWrap = document.querySelector('.movies__wrap');
    moviesWrap.innerHTML = '';

    data.forEach((movie) => {
        const rating = movie.ratingImdb ? movie.ratingImdb : movie.rating;
        const name = movie.nameRu === undefined ? movie.nameEn : movie.nameRu;
        const id = movie.kinopoiskId ? movie.kinopoiskId : movie.filmId;
        const moviesItem = document.createElement('div');
        moviesItem.innerHTML = `
                <div class="movies__item">
                    <div class="img__wrap">
                        <img
                            src="${movie.posterUrl}"
                            alt="${name}"
                            width="280"
                            height="404"
                        />
                    </div>
                    <div class="movie__title">${name}</div>
                    <div class="movie__categories">
                        ${movie.genres.map((genre) => `  ${genre.genre}`)}
                    </div> ${rating === 'null' ? '' : `<div class="rating ration-mod__${getRatingIndicator(rating)}">${rating}</div>`}
                </div>`;
        moviesWrap.append(moviesItem);
        moviesItem.addEventListener('click', () => {
            openModal(id);
        });
    });
}

function getRatingIndicator(rating) {
    if (rating >= 7) {
        return 'green';
    } else if (rating < 7 && rating > 4) {
        return 'orange';
    } else {
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (searchInput.value) {
        getMovies(`${API_URL_SEARCH}${searchInput.value}`).then();
        searchInput.value = '';
        searchInput.blur();
    }
});

logo.addEventListener('click', () => {
    getMovies(API_URL_POPULAR).then();
});

// MODAL
async function openModal(id) {
    const res = await fetch(`${API_URL_MOVIE_ID}${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY,
        },
    });
    const dataRes = await res.json();
    console.log(dataRes);
    modalWindow.classList.add('openModal');
    document.body.classList.add('stop__scroll');
    modalWindow.innerHTML = `
                <div class="modal__window">
                    <img class="modal__close" src="./modal_close.svg" alt="" />
                    <div class="flex__wrap">
                        <div class="image">
                            <img
                                src="${dataRes.posterUrl}"
                                alt="image"
                            />
                        </div>
                        <div class="content">
                            <table>
                                <tr>
                                    <th><span>Название:</span></th>
                                    <td>
                                        <h3 class="content__title">
                                            ${dataRes.nameRu}
                                        </h3>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span>Жанр:</span></th>
                                    <td>
                                        <div class="content__genres">
                                            ${dataRes.genres.map((genre) => `  ${genre.genre}`)}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span>Год выпуска:</span></th>
                                    <td>
                                        <div class="content__year">${dataRes.year}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span>Страна:</span></th>
                                    <td>
                                        <div class="content__countries">
                                            ${dataRes.countries[0].country}
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <div class="description">
                                ${dataRes.description}
                            </div>
                            <a class="link_btn" href="${dataRes.webUrl}" target="_blank">
                                <button class="content__webUrl">
                                    Посмотреть на кинопоиске
                                </button>
                            </a>
                        </div>
                    </div>
                </div>`;
    const modalClose = document.querySelector('.modal__close');
    const modalBody = document.querySelector('.modal__window');

    modalClose.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modalWindow) {
            closeModal();
        }
    });
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            closeModal();
        }
    });
}

function closeModal() {
    modalWindow.classList.remove('openModal');
    document.body.classList.remove('stop__scroll');
}
