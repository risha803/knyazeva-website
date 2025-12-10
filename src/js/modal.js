export function initModal() {
  document.querySelectorAll('.guide__img').forEach(img => {
    img.addEventListener('click', () => {
      let src = "";

      if (img.dataset.img) {
        src = img.dataset.img;
      } else {
        const style = window.getComputedStyle(img);
        const bg = style.backgroundImage;
        if (bg && bg !== "none") {
          src = bg.replace(/^url\(["']?/, "").replace(/["']?\)$/, "");
        }
      }

      if (!src) return;

      const modalImg = document.getElementById('modalImg');
      const modal = document.getElementById('imgModal');

      if (modalImg && modal) {
        modalImg.src = src;
        modal.classList.add('active');
      }
    });
  });

  const modal = document.getElementById('imgModal');
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target.id === 'imgModal') {
        e.currentTarget.classList.remove('active');
      }
    });
  }
}

