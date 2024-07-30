const container = document.querySelector('.slider__container');
const slider = document.querySelector('.slider__input');
const beforeImage = document.querySelector('.slider__image--before');

document.addEventListener('input', (e) => {
  const position = slider.value + '%';
  container.style.setProperty('--position', position);

  if (slider.value <= 38) {
    beforeImage.classList.add('hidden');
  } else {
    beforeImage.classList.remove('hidden');
  }
});
