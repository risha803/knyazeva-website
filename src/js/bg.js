export const editBgColorsTheme = () => {
  const sectionProject = document.querySelector('.project');
  const items = document.querySelectorAll('.project__item');

  if (!sectionProject || !items.length) return;

  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      let bgImage = '';
      let gradient = '';

      if (item.classList.contains('project__item-go')) {
        bgImage = "url('/public/starwars.jpg')";
        gradient = 'linear-gradient(rgba(60, 30, 54, 0.6), rgba(60, 30, 54, 0.8))';
      } else if (item.classList.contains('project__item-tablo')) {
        bgImage = "url('/public/bus.jpg')";
        gradient = 'linear-gradient(rgba(128, 128, 128, 0.4), rgba(128, 128, 128, 0.4))';
      } else if (item.classList.contains('project__item-cat')) {
        bgImage = "url('/public/image-cat.jpg')";
        gradient = 'linear-gradient(rgba(77, 109, 59, 0.5), rgba(77, 109, 59, 0.8))';
      } else {
        bgImage = "url('/public/icons/github-mark.svg')";
        gradient = 'linear-gradient(rgba(25, 25, 33, 0.5), rgba(25, 25, 33, 0.8))';
      }

      sectionProject.style.setProperty('--project-bg', bgImage);
      sectionProject.style.setProperty('--project-gradient', gradient);
      sectionProject.style.setProperty('--project-opacity', '1');
    });

    item.addEventListener('mouseleave', () => {
      sectionProject.style.setProperty('--project-opacity', '0');
    });
  });
};