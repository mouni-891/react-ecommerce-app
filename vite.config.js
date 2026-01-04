import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';



// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@context': path.resolve(__dirname, './src/Ecommerce/context'),
      '@components': path.resolve(__dirname, './src/Ecommerce/HomePage/components'),
      '@cart': path.resolve(__dirname, './src/Ecommerce/HomePage/components/Cart'),
      '@home': path.resolve(__dirname, './src/Ecommerce/HomePage/components/Home'),
    },
  },
});
    
