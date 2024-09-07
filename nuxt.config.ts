// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ["@nuxt/ui", "@nuxtjs/color-mode", "@nuxt/image", "nuxt-gtag"],

  colorMode: {
    classSuffix: ''
  },

  compatibilityDate: "2024-09-07",

  gtag: {
    id: 'G-EW2QK1NXB8'
  }
})