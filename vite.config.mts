import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync, mkdirSync } from 'fs';

const rootDir = resolve(process.cwd(), 'frontend');

export default defineConfig({
  root: rootDir,
  plugins: [
    react(),
    {
      name: 'copy-legacy-assets',
      closeBundle() {
        // Copy Science practice tool data files
        const distDir = resolve(rootDir, 'dist');
        const dataDir = resolve(distDir, 'data');
        const mapsDir = resolve(distDir, 'maps');
        const componentsDir = resolve(distDir, 'components', 'practice-tools');

        try {
          mkdirSync(dataDir, { recursive: true });
          mkdirSync(mapsDir, { recursive: true });
          mkdirSync(componentsDir, { recursive: true });

          copyFileSync(
            resolve(rootDir, 'data/science_formula_practice.js'),
            resolve(dataDir, 'science_formula_practice.js')
          );
          copyFileSync(
            resolve(rootDir, 'data/science_concept_questions.js'),
            resolve(dataDir, 'science_concept_questions.js')
          );
          copyFileSync(
            resolve(rootDir, 'data/science_chemistry_equations.js'),
            resolve(dataDir, 'science_chemistry_equations.js')
          );
          copyFileSync(
            resolve(
              rootDir,
              'components/practice-tools/ScienceFormulaPracticeTool.jsx'
            ),
            resolve(componentsDir, 'ScienceFormulaPracticeTool.jsx')
          );
          copyFileSync(
            resolve(
              rootDir,
              'components/practice-tools/ScienceConceptPracticeTool.jsx'
            ),
            resolve(componentsDir, 'ScienceConceptPracticeTool.jsx')
          );
          copyFileSync(
            resolve(
              rootDir,
              'components/practice-tools/ChemistryEquationTool.jsx'
            ),
            resolve(componentsDir, 'ChemistryEquationTool.jsx')
          );

          // Copy canonical US regions metadata from repo root to dist
          try {
            copyFileSync(
              resolve(process.cwd(), 'data', 'usRegions.json'),
              resolve(dataDir, 'usRegions.json')
            );
            console.log('✓ usRegions.json copied to dist/data');
          } catch (e) {
            console.warn('Warning: usRegions.json not found at /data');
          }

          // Copy map asset from repo root public (if present) to dist
          try {
            copyFileSync(
              resolve(process.cwd(), 'public', 'maps', 'us-regions.svg'),
              resolve(mapsDir, 'us-regions.svg')
            );
            console.log('✓ us-regions.svg copied to dist/maps');
          } catch (e) {
            // Frontend/public version will be copied automatically by Vite if present
          }

          console.log('✓ Legacy Science tool assets copied to dist');
        } catch (err) {
          console.warn('Warning: Failed to copy legacy assets:', err.message);
        }
      },
    },
  ],
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
