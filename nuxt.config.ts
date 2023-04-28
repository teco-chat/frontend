export default defineNuxtConfig({
  ssr: false,
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
    "~/assets/css/common.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || "",
    },
  },
});
