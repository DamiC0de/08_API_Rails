import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:4242' // Assurez-vous que votre serveur Rails tourne sur ce port
    }
  }
});
