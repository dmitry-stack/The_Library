import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

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
