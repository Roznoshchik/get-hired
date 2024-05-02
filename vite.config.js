// vite.config.js

import path from "node:path";

import { defineConfig } from "vite";

export default defineConfig({
  root: path.join(__dirname, "./client/static/"),
  base: "/static/",
  build: {
    outDir: path.join(__dirname, "./server/static/"),
    manifest: "manifest.json",
    assetsDir: "bundled",
    rollupOptions: {
      input: ["./client/static/script.ts", "./client/static/styles.css"],
    },
    emptyOutDir: true,
    copyPublicDir: false,
  },
});