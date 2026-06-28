import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// Vite config — CSS is injected into JS bundle, output is a single index.js
// base is set for correct asset paths on GitHub Pages
export default defineConfig({
  publicDir: "public",
  base: "/The_Library/",

  plugins: [cssInjectedByJsPlugin()],

  build: {
    outDir: "dist",
    emptyOutDir: true,

    rollupOptions: {
      output: {
        entryFileNames: "index.js",
        chunkFileNames: "index.js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
