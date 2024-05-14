import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Specify custom names for the bundled JS and CSS files
    rollupOptions: {
      output: {
        entryFileNames: "script.[hash].js", // Custom name for JS files
        chunkFileNames: "chunks/script.[hash].js", // Custom name for dynamic imported chunks
        assetFileNames: "[name].[hash].[ext]", // Custom name for asset files (e.g., CSS)
      },
    },
    css: {
      // Specify custom name for the bundled CSS file
      fileName: "styles.[hash].css",
    },
  },
});
