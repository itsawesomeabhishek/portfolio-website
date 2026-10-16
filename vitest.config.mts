import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./", import.meta.url)) },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules/**", ".next/**", ".cursor/**", "e2e/**"],
    coverage: {
      provider: "v8",
      include: ["content/**", "components/**", "lib/**"],
      exclude: ["**/*.test.*", "content/types.ts"],
      thresholds: { lines: 80, functions: 80, statements: 80, branches: 70 },
    },
  },
});
