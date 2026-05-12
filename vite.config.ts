import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Prevent duplicate React when manualChunks splits node_modules; duplicate
    // copies cause "Cannot read properties of undefined (reading 'createContext')".
    dedupe: ["react", "react-dom"],
  },
  build: {
    // Do not use custom manualChunks here: aggressive splitting has repeatedly
    // produced "Cannot read properties of undefined (reading 'createContext')"
    // on production (vendor chunk loads before / beside a broken React binding).
    // Let Rollup/Vite apply default chunking; keep react dedupe above.
    chunkSizeWarningLimit: 900,
  },
}));
