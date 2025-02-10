import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@vueuse/nuxt",
    "@nuxt/fonts",
    "@nuxt/test-utils/module",
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
    "@clerk/nuxt",
    "@nuxt/image",
  ],
  css: [
    "primeicons/primeicons.css",
    "~/assets/css/app.css",
    "~/assets/css/transitions.css",
  ],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  colorMode: {
    preference: "system",
    dataValue: "theme",
    classSuffix: "",
  },
  tailwindcss: { exposeConfig: true },
});
