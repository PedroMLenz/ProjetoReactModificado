// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    svgr({
      exportAsDefault: false, // permite exportar como { ReactComponent as ... }
    }),
    react(),
    tailwindcss(),
  ],
});
