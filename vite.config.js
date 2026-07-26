import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// El backend PHP es el mismo del POS. En desarrollo, Vite hace de
// proxy para evitar CORS y para que el SSE (cocina_stream.php)
// funcione igual que en producción.
//
// Cambia BACKEND por la URL donde corre tu Apache.
const BACKEND = 'http://localhost/las-acacias'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Todo lo que empiece por /api se reenvía al backend PHP.
      // El hook pide /api/includes/cocina_stream.php → aquí se
      // reescribe a /includes/cocina_stream.php contra el backend.
      '/api': {
        target: BACKEND,
        changeOrigin: true,
        rewrite: (ruta) => ruta.replace(/^\/api/, ''),
      },
    },
  },
})
