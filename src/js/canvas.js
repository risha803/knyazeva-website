const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1500;
canvas.height = 1500;
const fontSize = 14;
const symbols = ['█', '▓', '▒', '░', '1', '0', ' '];

function getColorByBrightness(brightness, intensity = 1) {
  const value = Math.floor(brightness * intensity);
  return `rgb(${value}, ${value}, 0)`;
}

export function initBinaryCanvas() {
  const img = new Image();
  img.src = '/public/mlMNx2no9oyl5vHueCk6E4PyL8MQxku1H6Nom1kNLKFzvI7zQa560RVuOCN7wOYoaqZVPnyccsCqdNsks6fVPO4h1-112.jpg';
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    const columns = Math.floor(canvas.width / fontSize);
    const rows = Math.floor(canvas.height / fontSize);
    const drops = new Array(columns).fill(0);
    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d');
    offCanvas.width = canvas.width;
    offCanvas.height = canvas.height;
    offCtx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const imageData = offCtx.getImageData(0, 0, canvas.width, canvas.height);
    let frame = 0;

    function animate() {
      const cycleSpeed = 0.005;
      const intensity = 0.2 + 0.8 * Math.abs(Math.sin(frame * cycleSpeed));

      ctx.fillStyle = 'rgba(22, 42, 55, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let x = 0; x < columns; x++) {
        drops[x] = (drops[x] + 1) % rows;
        for (let y = 0; y < rows; y++) {
          const posX = x * fontSize;
          const posY = ((drops[x] + y) % rows) * fontSize;
          const pixelX = Math.min(posX, canvas.width - 1);
          const pixelY = Math.min(posY, canvas.height - 1);
          const i = (pixelY * canvas.width + pixelX) * 4;
          const r = imageData.data[i];
          const g = imageData.data[i + 1];
          const b = imageData.data[i + 2];
          const brightness = (r + g + b) / 3;
          const symbolIndex = Math.floor((brightness / 255) * (symbols.length - 1));
          const symbol = symbols[symbolIndex];

          ctx.fillStyle = getColorByBrightness(brightness, intensity);
          ctx.fillText(symbol, posX, posY);
        }
      }
      frame++;
      requestAnimationFrame(animate);
    }
    animate();
  };

  img.onerror = () => {
    console.error('Image failed to load');
  };
}