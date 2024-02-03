import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Resto de tus importaciones y configuraciones

// Exporta tu configuración utilizando defineConfig
export default defineConfig({
  // ...tu configuración
  plugins: [react()],
});
