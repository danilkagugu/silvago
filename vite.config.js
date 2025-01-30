import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3838, // Вказуємо порт, на якому запускатиметься сервер
  },
  build: {
    sourcemap: true,
  },
  cacheDir: false, // додай це
});
