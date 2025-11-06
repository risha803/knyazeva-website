export const editBgColorsTheme = () => {
  const sectionProject = document.querySelector('.project');
  const items = document.querySelectorAll('.project__item');

  if (!sectionProject || !items.length) return;

  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      if (item.classList.contains('project__item-go')) {
        sectionProject.style.backgroundColor = '#3c1e36';
      } else if (item.classList.contains('project__item-tablo')) {
        sectionProject.style.backgroundColor = '#808080';
      } else if (item.classList.contains('project__item-cat')) {
        sectionProject.style.backgroundColor = '#4d6d3b';
      } else {
        sectionProject.style.backgroundColor = '#191921';
      }
    });

    item.addEventListener('mouseleave', () => {
      sectionProject.style.backgroundColor = '';
    });
  });
};