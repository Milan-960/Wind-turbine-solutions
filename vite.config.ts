import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    strictPort: true,
  },
  build: {
    sourcemap: true,
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          leaflet: ['leaflet', 'leaflet-control-geocoder'],
          chartjs: ['chart.js', 'react-chartjs-2'],
          react: ['react', 'react-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 600, // Adjust the limit if necessary
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Use the new API for scss preprocessing in Vite
        // ref: https://vite.dev/config/shared-options#css-preprocessoroptions
        api: 'modern-compiler', // or "modern"
        sourceMap: true,
      },
    },
  },
});
