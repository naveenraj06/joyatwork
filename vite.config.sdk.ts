import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const isWebComponent = mode === 'wc';

  return {
    plugins: [
      react(),
      tailwindcss()
    ],
    build: {
      outDir: isWebComponent ? 'dist/wc' : 'dist/react',
      emptyOutDir: true,
      sourcemap: false,
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'EmployeeMoments',
        fileName: (format) => `index.${format === 'es' ? 'js' : 'umd.cjs'}`,
        formats: isWebComponent ? ['umd'] : ['es', 'umd']
      },
      rollupOptions: {
        // Externalize react, react-dom, and other heavy dependencies ONLY for the standard React bundle.
        // For the standalone Web Component (wc) bundle, we bundle them in for drop-in convenience.
        external: isWebComponent ? [] : ['react', 'react-dom', 'react-dom/client', 'lucide-react', 'motion', 'motion/react', 'canvas-confetti'],
        output: {
          globals: isWebComponent 
            ? {} 
            : {
                react: 'React',
                'react-dom': 'ReactDOM',
                'react-dom/client': 'ReactDOMClient',
                'lucide-react': 'LucideReact',
                'motion': 'Motion',
                'motion/react': 'Motion',
                'canvas-confetti': 'confetti'
              },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'style.css') return 'index.css';
            return assetInfo.name || '';
          }
        }
      }
    }
  };
});
