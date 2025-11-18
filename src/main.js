import './style.scss';
import './js/waves.js';
import { editBgColorsTheme } from './js/bg';
import { initThemeToggle } from './modules/theme/theme.js';
import { initContactForm } from './js/contactForm';

import moonIcon from './img/moon-icon.svg?raw';
import sunIcon from './img/sun-icon.svg?raw';

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('dark-theme');
  // updateThemeIcon();
  initThemeToggle(updateThemeIcon);
  editBgColorsTheme();

  initContactForm();
});

// function updateThemeIcon() {
//   const isDark = document.body.classList.contains('dark-theme');
//   const toggleBtn = document.querySelector('#header__themeToggle');

//   if (!toggleBtn) return;
//   toggleBtn.innerHTML = isDark ? sunIcon : moonIcon;
//   const svg = toggleBtn.querySelector('svg');
//   if (svg) svg.classList.add('header__theme-icon');
// }