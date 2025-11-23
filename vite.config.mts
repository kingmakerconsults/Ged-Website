import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const rootDir = path.resolve(__dirname, 'frontend');

export default defineConfig({
  root: rootDir,
  plugins: [react()],
  build: {
    outDir: path.resolve(rootDir, 'dist'),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true,
      },
    },
  },
});
