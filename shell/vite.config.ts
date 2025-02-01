import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react";
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        worker: 'http://localhost:3001/assets/remoteEntry.js',
      },
      exposes: {
        './components': './src/components',
      },
      shared: ['react', 'react-dom'],
    }),
    {
      name: 'vite-plugin-reload-endpoint',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const reqUrl = (req as { url?: string }).url ?? '';
          if (reqUrl === '/__fullReload') {
            server.hot.send({ type: 'full-reload' });
    
            res.end('Full reload triggered');
          } else {
            next();
          }
        });
      },
    }
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      src: '/src',
    },
  },
  server: {
    port: 3000,
  },
});