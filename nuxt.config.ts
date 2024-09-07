// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ["@nuxt/ui", "@nuxtjs/color-mode", "@nuxt/image"],

  colorMode: {
    classSuffix: ''
  },

  compatibilityDate: "2024-09-07"
})