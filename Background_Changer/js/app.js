const btn = document.getElementById('btn')
const body = document.querySelector('body')
const color = document.querySelector('.color')

// const rgbRandom = () => {
//     const rgb1 = Math.floor(Math.random() * 255)
//     const rgb2 = Math.floor(Math.random() * 255)
//     const rgb3 = Math.floor(Math.random() * 255)
//     return `rgb(${rgb1}, ${rgb2}, ${rgb3})`
// }

let colorActive = '#283cff'

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
    colorActive = hexColor

    // Собираем итоговый цвет в формате HEX
    return hexColor;

}
btn.addEventListener('click', () => {
    body.style.backgroundColor = generateRandomColor()
    color.textContent = colorActive
})


