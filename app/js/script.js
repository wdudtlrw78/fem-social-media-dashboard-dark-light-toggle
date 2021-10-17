'use strict';

const checkedDark = document.querySelector('#dark');
const radioButtons = document.querySelectorAll('.toggle__wrapper input');

for (let i = 0; i < radioButtons.length; i++) {
  radioButtons[i].addEventListener('click', () => {
    checkedDark.checked
      ? (document.querySelector('body').classList = 'dark')
      : (document.querySelector('body').classList = 'light');
  });
}
