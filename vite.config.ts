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
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          const norm = id.split("\\").join("/");

          // GSAP first — paths like @gsap/react must NOT hit the loose "/react/" rule
          // that used to pull unrelated packages into react-vendor.
          if (norm.includes("gsap") || norm.includes("@gsap")) return "gsap";
          if (norm.includes("framer-motion")) return "motion";
          if (norm.includes("@tanstack/react-query")) return "query";
          if (norm.includes("recharts")) return "charts";
          if (norm.includes("@radix-ui")) return "radix";
          if (norm.includes("lucide-react")) return "icons-lucide";
          if (norm.includes("@heroicons")) return "icons-hero";

          // Only the real react / react-dom / scheduler / router packages — not every
          // module whose path contains the substring "react".
          if (
            norm.includes("/react-dom/") ||
            /[/]node_modules[/]react[/]/.test(norm) ||
            norm.includes("/scheduler/") ||
            norm.includes("react-router")
          ) {
            return "react-vendor";
          }

          return "vendor";
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
}));
