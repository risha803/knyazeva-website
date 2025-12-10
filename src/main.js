import './style.scss';
import './js/waves.js';
import { editBgColorsTheme } from './js/bg';
import { initThemeToggle } from './modules/theme/theme.js';
import { initContactForm } from './js/contactForm';
import { initModal } from './js/modal.js';

import moonIcon from './img/moon-icon.svg?raw';
import sunIcon from './img/sun-icon.svg?raw';

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('dark-theme');
  initThemeToggle(updateThemeIcon);
  editBgColorsTheme();
  initContactForm();

  initFadeInOnScroll();
  initLazyLoadImages();
  initModal();
});

window.addEventListener("load", () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add("hide");
    setTimeout(() => {
      preloader.remove();
      revealVisibleOnLoad();
    }, 500);
  } else {
    revealVisibleOnLoad();
  }
});

function revealVisibleOnLoad() {
  const items = document.querySelectorAll('.fade-in');
  items.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      el.classList.add('visible');
    }
  });
}

function initFadeInOnScroll() {
  const items = document.querySelectorAll('.fade-in');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  });
  items.forEach(el => observer.observe(el));
}

function initLazyLoadImages() {
  const lazyImages = document.querySelectorAll('img.lazy');
  if (!('IntersectionObserver' in window)) {
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      if (img.dataset.srcset) img.srcset = img.dataset.srcset;
      img.classList.add('loaded');
    });
    return;
  }
  const imgObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        if (img.dataset.srcset) img.srcset = img.dataset.srcset;
        img.addEventListener('load', () => img.classList.add('loaded'));
        obs.unobserve(img);
      }
    });
  }, {
    rootMargin: '100px 0px',
    threshold: 0.01
  });
  lazyImages.forEach(img => imgObserver.observe(img));
}

function updateThemeIcon() {
  const isDark = document.body.classList.contains('dark-theme');
  const toggleBtn = document.querySelector('#header__themeToggle');
  if (!toggleBtn) return;
  toggleBtn.innerHTML = isDark ? sunIcon : moonIcon;
  const svg = toggleBtn.querySelector('svg');
  if (svg) svg.classList.add('header__theme-icon');
}
