// import { fileURLToPath } from "node:url";
// import { defineVitestConfig } from "@nuxt/test-utils/config";

// export default defineVitestConfig({
//   test: {
//     environment: "nuxt",
//     environmentOptions: {
//       nuxt: {
//         rootDir: fileURLToPath(new URL("./playground", import.meta.url)),
//         domEnvironment: "happy-dom", // 'happy-dom' (default) or 'jsdom'
//         overrides: {
//           // other Nuxt config you want to pass
//         },
//         mock: {
//           intersectionObserver: true,
//           indexedDb: true,
//         },
//       },
//     },
//   },
// });

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./"),
      "@": path.resolve(__dirname, "src"),
      "~components": path.resolve(__dirname, "components"),
      "~assets": path.resolve(__dirname, "assets"),
      "~store": path.resolve(__dirname, "store"),
      "~pages": path.resolve(__dirname, "pages"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/config/setup.ts",
  },
});
