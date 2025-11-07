import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  if (!env.VITE_SUPABASE_URL && env.SUPABASE_URL) {
    env.VITE_SUPABASE_URL = env.SUPABASE_URL;
    process.env.VITE_SUPABASE_URL = env.SUPABASE_URL;
  }

  if (!env.VITE_SUPABASE_PUBLISHABLE_KEY && env.SUPABASE_KEY) {
    env.VITE_SUPABASE_PUBLISHABLE_KEY = env.SUPABASE_KEY;
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY = env.SUPABASE_KEY;
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
