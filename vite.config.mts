import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const rootDir = resolve(process.cwd(), 'frontend');

export default defineConfig({
  root: rootDir,
  plugins: [react()],
  build: {
    outDir: resolve(rootDir, 'dist'),
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000, // Suppress warning for large legacy app bundle
    sourcemap: true, // Enable source maps to trace minified symbol 'lt'
    minify: false, // Disable minification temporarily for debugging ReferenceError
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true,
      },
      '/quizzes': {
        target: 'http://localhost:3002',
        changeOrigin: true,
      },
    },
  },
});
