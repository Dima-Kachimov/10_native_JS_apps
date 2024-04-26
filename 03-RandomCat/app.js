// Получем элементы со страницы
const btn = document.querySelector('button')
const image = document.querySelector('img')

// url API
const urlApi = "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1"

// Функция которая выполняет запрос на сервер
async function getImageApi() {
  try {
    const res = await fetch(urlApi)
    const data = await res.json()
    image.src = data[0].url
  } catch (e) {
    console.log(e)
  }
}

// Вешаем событие клик и запускаем функцию
btn.addEventListener('click', () => {
  getImageApi().then()
})

