import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 5173,
    host: '0.0.0.0', // You can keep this as '0.0.0.0' if you're deploying to a remote server
    allowedHosts: [
      'sistema-de-electricidadd-production-64cd.up.railway.app', // Add the host here
      'localhost', // You can also add 'localhost' for local development
    ]
  },
  build: {
    outDir: 'dist',
  }
});
