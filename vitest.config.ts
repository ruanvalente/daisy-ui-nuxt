import path from "node:path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			"#app": path.resolve(__dirname, "node_modules/nuxt/dist/app"),
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
		deps: {
			inline: ["vue"],
		},
		coverage: {
			provider: "v8",
			reporter: ["html"],
			reportsDirectory: "./tests/coverage",
		},
	},
});
