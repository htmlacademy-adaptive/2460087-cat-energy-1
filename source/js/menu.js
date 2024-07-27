document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.user-menu__button-menu');
  const nav = document.querySelector('.user-menu');
  const navList = nav.querySelector('.user-menu__navigation-list');

  if (button && nav && navList) {
    nav.classList.remove('user-menu--no-js');
    nav.classList.add('user-menu--closed');

    nav.classList.add('user-menu--no-animation');

    setTimeout(() => {
      nav.classList.remove('user-menu--no-animation');
    }, 10);

    button.addEventListener('click', () => {
      const isOpened = nav.classList.toggle('user-menu--opened');
      nav.classList.toggle('user-menu--closed');
    });
  }
});
