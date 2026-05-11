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
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          // Core React — cache separately from feature code.
          if (
            id.includes("react-dom") ||
            id.includes("/react/") ||
            id.includes("react-router") ||
            id.includes("scheduler")
          ) {
            return "react-vendor";
          }
          if (id.includes("framer-motion")) return "motion";
          if (id.includes("gsap") || id.includes("@gsap")) return "gsap";
          if (id.includes("@tanstack/react-query")) return "query";
          if (id.includes("recharts")) return "charts";
          if (id.includes("@radix-ui")) return "radix";
          if (id.includes("lucide-react")) return "icons-lucide";
          if (id.includes("@heroicons")) return "icons-hero";
          return "vendor";
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
}));
