// Найти все ссылки начинающиеся на #
const anchors = document.querySelectorAll('a[href^="#"]')
// Цикл по всем ссылкам
for(let anchor of anchors) {
  anchor.addEventListener("click", function(e) {
    e.preventDefault() // Предотвратить стандартное поведение ссылок
    // Атрибут href у ссылки, если его нет то перейти к body (наверх не плавно)
    const goto = anchor.hasAttribute('href') ? anchor.getAttribute('href') : 'body'
    // Плавная прокрутка до элемента с id = href у ссылки
    document.querySelector(goto).scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  })
}

// Таймер
document.addEventListener('DOMContentLoaded', function() {
	// конечная дата, например 1 июля 2021
	let deadline = new Date('May 24 2024 00:00:00');
	// id таймера
	let timerId = null;
	// склонение числительных
	function declensionNum(num, words) {
	  return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
	}
	// вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
	function countdownTimer() {
	  const diff = deadline - new Date();
	  if (diff <= 0) {
		clearInterval(timerId);
	  }
	  const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
	  const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
	  const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
	  const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
	  $days.textContent = days < 10 ? '0' + days : days;
	  $hours.textContent = hours < 10 ? '0' + hours : hours;
	  $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
	  $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
	  $days.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
	  $hours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
	  $minutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
	  $seconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
	}
	// получаем элементы, содержащие компоненты даты
	const $days = document.querySelector('.timer-days');
	const $hours = document.querySelector('.timer-hours');
	const $minutes = document.querySelector('.timer-minutes');
	const $seconds = document.querySelector('.timer-seconds');
	// вызываем функцию countdownTimer
	countdownTimer();
	// вызываем функцию countdownTimer каждую секунду
	timerId = setInterval(countdownTimer, 1000);
  });