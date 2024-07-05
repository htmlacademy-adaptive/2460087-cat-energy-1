const button = document.querySelector('.user-menu__button-menu');
const nav = document.querySelector('.user-menu');

nav.classList.remove('user-menu--no-js');
nav.classList.add('user-menu--closed');

button.addEventListener('click', () => {
  nav.classList.toggle('user-menu--closed');
  nav.classList.toggle('user-menu--opened');
});
