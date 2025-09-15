// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      failOnError: false
    }
  },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    buildAssetsDir: '/_nuxt/'
  },
  runtimeConfig: {
    public: {
      sanityProjectId: '928u0duj',
      sanityDataset: 'production',
      sanityApiVersion: '2023-05-03',
    }
  },
  css: ['~/assets/css/main.css'],
  ssr: false,
  experimental: {
    payloadExtraction: false
  }
})
