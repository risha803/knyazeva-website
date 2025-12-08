import { defineConfig } from 'vite';
import path from 'path';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        go: path.resolve(__dirname, 'go.html'),
        bus: path.resolve(__dirname, 'bus.html'),
        catEnergy: path.resolve(__dirname, 'cat-energy.html'),
      }
    }
  },
  plugins: [
    viteImagemin({
      mozjpeg: { quality: 80 },
      optipng: { optimizationLevel: 5 },
      pngquant: { quality: [0.7, 0.9] },
      gifsicle: { optimizationLevel: 3 },
      svgo: {},
      webp: { quality: 80 }
    })
  ]
});