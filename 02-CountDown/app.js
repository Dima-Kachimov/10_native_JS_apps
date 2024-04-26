'use strict'

function startCountdown(targetDate) {
  const daysElement = document.querySelector('.days')
  const hoursElement = document.querySelector('.hours')
  const minutesElement = document.querySelector('.minutes')
  const secondsElement = document.querySelector('.seconds')

    // Функция обновления таймера
    function updateCountdown() {
        // Получаем текущую дату и время
        const currentDate = new Date();

        // Вычисляем разницу между текущей датой и целевой датой
        const difference = targetDate - currentDate;

        // Вычисляем оставшиеся дни, часы, минуты и секунды
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Выводим таймер на странице
      daysElement.textContent = days.toString()
      hoursElement.textContent = hours.toString()
      minutesElement.textContent = minutes.toString()
      secondsElement.textContent = seconds.toString()
    }

    // Запускаем обновление таймера каждую секунду
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Сразу запускаем обновление таймера
    updateCountdown();
}

// Пример использования функции:
// Задаем целевую дату - 1 мая 2024 года в 12:00:00
const targetDate = new Date(2024, 3, 26, 17, 0, 0);
// Запускаем таймер
startCountdown(targetDate);