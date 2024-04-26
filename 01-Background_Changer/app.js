// Получаем элементы со страницы
const btn = document.getElementById('btn')
const body = document.querySelector('body')
const color = document.querySelector('.color')

// Обьявляем переменную с активным цветом
let colorActive

// Слушаем событе CLICK и меняем цвет на странице
btn.addEventListener('click', () => {
    body.style.backgroundColor = generateRandomColor()
    color.textContent = colorActive
})

// Функция генерации цвета в формате HEX
function generateRandomColor() {
    // Генерируем три случайных значения для красного, зеленого и синего каналов
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Преобразуем значения в формат HEX
    const hexRed = red.toString(16).padStart(2, '0');
    const hexGreen = green.toString(16).padStart(2, '0');
    const hexBlue = blue.toString(16).padStart(2, '0');

    const hexColor = `#${hexRed}${hexGreen}${hexBlue}`

    // Меняем активный цвет
    colorActive = hexColor

    // Собираем итоговый цвет в формате HEX
    return hexColor;
}

