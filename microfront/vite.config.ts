import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react";
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'worker',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
        "./WorkerHeader": "./src/components/WorkerHeader.tsx",

      },
      shared: ['react', 'react-dom'],
    }),
    {
      name: 'vite-plugin-notify-host-on-rebuild',
      apply(config, { command }) {

        return Boolean(command === 'build' && config.build?.watch);
      },
      async buildEnd(error) {
        if (!error) {
          try {
            await fetch('http://localhost:3000/__fullReload');
          } catch (e) {
            console.log(e)
          }
        }
      },
    }
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3001,
  },
});