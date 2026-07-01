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
      sourcemap: true,
      lib: {
        entry: path.resolve(__dirname, isWebComponent ? 'src/web-components.tsx' : 'src/index.ts'),
        name: 'EmployeeMoments',
        fileName: (format) => `index.${format === 'es' ? 'js' : 'umd.cjs'}`,
        formats: isWebComponent ? ['umd'] : ['es', 'umd']
      },
      rollupOptions: {
        // Externalize react, react-dom, and other heavy dependencies ONLY for the standard React bundle.
        // For the standalone Web Component (wc) bundle, we bundle them in for drop-in convenience.
        external: isWebComponent ? [] : ['react', 'react-dom', 'react-dom/client', 'lucide-react', 'canvas-confetti'],
        output: {
          globals: isWebComponent 
            ? {} 
            : {
                react: 'React',
                'react-dom': 'ReactDOM',
                'react-dom/client': 'ReactDOMClient',
                'lucide-react': 'LucideReact',
                'canvas-confetti': 'confetti'
              },
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name;
            if (name && name.endsWith('.css')) return 'index.css';
            return name || '[name].[ext]';
          }
        }
      }
    }
  };
});
