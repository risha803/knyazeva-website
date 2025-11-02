export const editBgColorsTheme = () => {
  const sectionProject = document.querySelector('.project');
  const items = document.querySelectorAll('.project__item');

  if (!sectionProject || !items.length) return;

  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      if (item.classList.contains('project__item-go')) {
        sectionProject.style.backgroundColor = '#8A2BE2';
      } else if (item.classList.contains('project__item-tablo')) {
        sectionProject.style.backgroundColor = '#D3D3D3';
      } else if (item.classList.contains('project__item-cat')) {
        sectionProject.style.backgroundColor = '#7CFC00';
      } else {
        sectionProject.style.backgroundColor = '#2F4F4F';
      }
    });

    item.addEventListener('mouseleave', () => {
      sectionProject.style.backgroundColor = '';
    });
  });
};