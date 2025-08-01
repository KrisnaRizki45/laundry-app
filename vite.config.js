import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888', // arahkan ke backend-mu
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, '/api/v1'), // tambahkan prefix /api/v1
      }
    }
  }
});
