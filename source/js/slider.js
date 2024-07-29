const container = document.querySelector('.slider__container');
const slider = document.querySelector('.slider__input');
document.addEventListener('input', (e) => {
  container.style.setProperty('--position', slider.value + '%');
})
