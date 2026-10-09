import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": root("."),
      "server-only": root("tests/server-only.ts"),
    },
  },
  test: {
    include: ["tests/**/*.test.{ts,tsx}"],
  },
});
