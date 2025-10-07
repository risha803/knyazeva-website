export function initThemeToggle(updateIconCallback) {
  const toggleButton = document.querySelector('#header__themeToggle');
  if (!toggleButton) return;

  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');

    if (typeof updateIconCallback === 'function') {
      updateIconCallback();
    }
  });
}