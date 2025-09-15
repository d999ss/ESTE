// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  nitro: {
    preset: 'static'
  },
  runtimeConfig: {
    public: {
      sanityProjectId: '928u0duj',
      sanityDataset: 'production',
      sanityApiVersion: '2023-05-03',
    }
  },
  css: ['~/assets/css/main.css']
})
