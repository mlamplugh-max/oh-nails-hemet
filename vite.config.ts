import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/oh-nails-hemet/',
  plugins: [react()],
  build: {
    sourcemap: true
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: ['gary-provided-dressing-stayed.trycloudflare.com', '.trycloudflare.com']
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: ['gary-provided-dressing-stayed.trycloudflare.com', '.trycloudflare.com']
  }
});
