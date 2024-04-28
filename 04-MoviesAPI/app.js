'use strict';
const form = document.querySelector('form');
const searchInput = document.querySelector('.search');
const logo = document.querySelector('.logo');

const API_KEY = 'ceef2047-66e0-4576-9f66-941ceaf2a54b';
const API_URL_POPULAR =
    'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1';
const API_URL_SEARCH =
    'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';

async function getMovies(url) {
    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY,
        },
    });
    const resData = await res.json();
    renderItemMovie(resData.items ? resData.items : resData.films);
    console.log(resData.items, resData.films);
}

getMovies(API_URL_POPULAR).then();

function renderItemMovie(data) {
    const moviesWrap = document.querySelector('.movies__wrap');
    moviesWrap.innerHTML = '';

    data.forEach((movie) => {
        const rating = movie.ratingImdb ? movie.ratingImdb : movie.rating;
        const name = movie.nameRu === undefined ? movie.nameEn : movie.nameRu;

        moviesWrap.insertAdjacentHTML(
            'beforeend',
            `
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
                </div>`
        );
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
        getMovies(`${API_URL_SEARCH}${searchInput.value}`);
        searchInput.value = '';
        searchInput.blur();
    }
});

logo.addEventListener('click', () => {
    getMovies(API_URL_POPULAR).then();
});
