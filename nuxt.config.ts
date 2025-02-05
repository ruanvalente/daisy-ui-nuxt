// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/fonts", "@nuxt/test-utils/module"],
  vite: {
    plugins: [tailwindcss()],
  },
  css: [
    "~/assets/css/app.css",
    "primeicons/primeicons.css",
    "~/assets/css/transitions.css",
  ],
  app: {
    head: {
      htmlAttrs: {
        "data-theme": "light",
      },
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
});
