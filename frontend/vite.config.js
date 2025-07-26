// frontend/vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]',
      },
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // Lokal für Entwicklung
    },
  },
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=0',
    },
    strictPort: true,
    port: 5173,
  },
});