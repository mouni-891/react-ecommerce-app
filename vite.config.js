import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@context": path.resolve(__dirname, "./src/Ecommerce/context"),
      "@components": path.resolve(__dirname, "./src/Ecommerce/components"),
      "@cart": path.resolve(__dirname, "./src/Ecommerce/pages/Cart"),
      "@home": path.resolve(__dirname, "./src/Ecommerce/components/Home"),
      "@wishlist": path.resolve(__dirname, "./src/Ecommerce/pages/Wishlist"),
      "@auth": path.resolve(__dirname, "./src/Ecommerce/auth"),
      "@data": path.resolve(__dirname, "./src/Ecommerce/data"),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
});
